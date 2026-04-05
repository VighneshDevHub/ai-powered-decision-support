import os

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

    df = read_file(file_path)
    context = build_ai_context(df)

    ai_plan = ask_ai_what_to_calculate(context, llm_call_fn)
    metrics = execute_metrics(df, ai_plan, context)

    ai_confidence = calculate_ai_confidence(
        context["data_confidence"],
        metrics
    )

    insights = generate_top_insights(
        llm_call_fn,
        context,
        metrics
    )

    action_plan = generate_30_day_plan(
        llm_call_fn,
        metrics,
        context["data_confidence"]
    )

    # Normalize insights to a list
    final_insights = []
    if isinstance(insights, dict):
        # Handle {"insights": [...]} or just {...}
        final_insights = insights.get("insights", []) if isinstance(insights.get("insights"), list) else [insights]
    elif isinstance(insights, list):
        final_insights = insights
    
    # Normalize action plan to a list
    final_action_plan = []
    if isinstance(action_plan, dict):
        final_action_plan = action_plan.get("action_plan_30_days", [])
    elif isinstance(action_plan, list):
        final_action_plan = action_plan

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

    processed_path = save_processed_json(file_name, processed_output)
    context_path = save_context_json(file_name, context_snapshot)

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
