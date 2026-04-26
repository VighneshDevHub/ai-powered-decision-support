import os
import logging
import traceback

logger = logging.getLogger(__name__)

from engine.storage.file_reader import read_file
from engine.context.context_builder import build_ai_context
from engine.ai.ai_planner import ask_ai_what_to_calculate
from engine.utils.executor import execute_metrics
from engine.ai.insight_generator import generate_top_insights
from engine.ai.ai_confidence import calculate_ai_confidence
from engine.ai.action_plan import generate_30_day_plan
from engine.context.context_snapshot import build_context_snapshot
from engine.storage.storage import save_processed_json, save_context_json
from engine.llm.llm_groq import llm_call_fn
from engine.db.db_ops import get_or_create_user, save_document_record

def process_file_and_store(
    file_path: str,
    clerk_user_id: str,
    nickname: str | None = None
):
    file_name = os.path.basename(file_path)

    logger.info(f"Starting file processing for: {file_name}")
    try:
        df = read_file(file_path)
        logger.info(f"File read successful: {len(df)} rows, columns: {list(df.columns)}")
    except Exception as e:
        logger.error(f"Error reading file {file_name}: {e}")
        logger.error(traceback.format_exc())
        raise e

    try:
        context = build_ai_context(df)
        logger.info(f"AI context built: data_confidence={context['data_confidence']}%")
    except Exception as e:
        logger.error(f"Error building AI context for {file_name}: {e}")
        logger.error(traceback.format_exc())
        raise e

    try:
        ai_plan = ask_ai_what_to_calculate(context, llm_call_fn)
        logger.info(f"AI plan generated: {ai_plan}")
    except Exception as e:
        logger.error(f"Error generating AI plan for {file_name}: {e}")
        logger.error(traceback.format_exc())
        raise e

    try:
        metrics = execute_metrics(df, ai_plan, context)
        logger.info(f"Metrics executed: {len(metrics)} results")
        for m in metrics:
            if "error" in m:
                logger.warning(f"Metric calculation error for '{m.get('metric')}': {m.get('error')}")
    except Exception as e:
        logger.error(f"Error executing metrics for {file_name}: {e}")
        logger.error(traceback.format_exc())
        raise e

    try:
        ai_confidence = calculate_ai_confidence(
            context["data_confidence"],
            metrics
        )
        logger.info(f"AI confidence calculated: {ai_confidence}")
    except Exception as e:
        logger.error(f"Error calculating AI confidence for {file_name}: {e}")
        logger.error(traceback.format_exc())
        ai_confidence = 0 # Fallback

    try:
        insights = generate_top_insights(
            llm_call_fn,
            context,
            metrics
        )
        logger.info(f"Insights generated: {insights}")
    except Exception as e:
        logger.error(f"Error generating insights for {file_name}: {e}")
        logger.error(traceback.format_exc())
        insights = []

    try:
        action_plan = generate_30_day_plan(
            llm_call_fn,
            metrics,
            context["data_confidence"]
        )
        logger.info(f"Action plan generated: {action_plan}")
    except Exception as e:
        logger.error(f"Error generating action plan for {file_name}: {e}")
        logger.error(traceback.format_exc())
        action_plan = []

    # Normalize insights to a list
    final_insights = []
    logger.info(f"Normalizing insights: {type(insights)}")
    if isinstance(insights, dict):
        # Handle {"insights": [...]} or just {...}
        # Be extremely careful: check if insights.get exists (it should for dict)
        try:
            inner = insights.get("insights", [])
            if isinstance(inner, list):
                final_insights = inner
            else:
                final_insights = [insights]
        except AttributeError as e:
            logger.error(f"AttributeError during insights normalization: {e}. insights type: {type(insights)}, value: {insights}")
            final_insights = [insights] if not isinstance(insights, list) else insights
    elif isinstance(insights, list):
        final_insights = insights
    else:
        # Fallback for unexpected types
        final_insights = [str(insights)] if insights else []
    
    # Normalize action plan to a list
    final_action_plan = []
    logger.info(f"Normalizing action plan: {type(action_plan)}")
    if isinstance(action_plan, dict):
        try:
            inner_plan = action_plan.get("action_plan_30_days", [])
            if isinstance(inner_plan, list):
                final_action_plan = inner_plan
            else:
                final_action_plan = [action_plan]
        except AttributeError as e:
            logger.error(f"AttributeError during action_plan normalization: {e}. action_plan type: {type(action_plan)}, value: {action_plan}")
            final_action_plan = [action_plan] if not isinstance(action_plan, list) else action_plan
    elif isinstance(action_plan, list):
        final_action_plan = action_plan
    else:
        # Fallback for unexpected types
        final_action_plan = [str(action_plan)] if action_plan else []

    processed_output = {
        "file_name": file_name,
        "nickname": nickname,
        "data_confidence": float(context["data_confidence"]),
        "ai_confidence": float(ai_confidence),
        "metrics": metrics,
        "insights": final_insights,
        "action_plan_30_days": final_action_plan
    }

    context_snapshot = build_context_snapshot(processed_output)

    try:
        processed_path = save_processed_json(file_name, processed_output)
        context_path = save_context_json(file_name, context_snapshot)
    except Exception as e:
        logger.error(f"Failed to save processed/context JSON: {e}")
        logger.error(traceback.format_exc())
        raise e

    get_or_create_user(clerk_user_id)

    doc = save_document_record(
        clerk_user_id=clerk_user_id,
        original_filename=file_name,
        processed_path=processed_path,
        context_path=context_path,
        data_confidence=context["data_confidence"],
        ai_confidence=ai_confidence,
        nickname=nickname
    )

    return {
        "document_id": str(doc.id),
        "processed_path": processed_path,
        "context_path": context_path,
        "nickname": nickname
    }
