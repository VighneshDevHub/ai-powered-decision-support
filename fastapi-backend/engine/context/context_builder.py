from engine.schema.schema import infer_column_types

def calculate_data_confidence(df):
    total = df.shape[0] * df.shape[1]
    missing = df.isna().sum().sum()
    missing_ratio = missing / total if total else 1

    row_score = min(1.0, df.shape[0] / 100)
    confidence = (1 - missing_ratio) * row_score
    return round(confidence * 100, 2)


def build_ai_context(df):
    column_types = infer_column_types(df)

    numeric_cols = [c for c, t in column_types.items() if t == "number"]
    date_cols = [c for c, t in column_types.items() if t == "date"]

    numeric_summary = {}
    for col in numeric_cols:
        values = df[col].dropna()
        if len(values) > 1:
            numeric_summary[col] = {
                "mean": float(values.mean()),
                "min": float(values.min()),
                "max": float(values.max()),
                "std": float(values.std())
            }

    return {
        "row_count": len(df),
        "columns": list(df.columns),
        "column_types": column_types,
        "numeric_columns": numeric_cols,
        "date_columns": date_cols,
        "numeric_summary": numeric_summary,
        "data_confidence": calculate_data_confidence(df),
        "sample_rows": df.head(5).to_dict(orient="records")
    }
