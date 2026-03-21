import pandas as pd

def infer_column_types(df: pd.DataFrame) -> dict:
    types = {}

    for col in df.columns:
        series = df[col]

        if pd.api.types.is_numeric_dtype(series):
            types[col] = "number"
        elif pd.api.types.is_datetime64_any_dtype(series):
            types[col] = "date"
        else:
            try:
                pd.to_datetime(series.dropna().iloc[0])
                types[col] = "date"
            except:
                types[col] = "string"

    return types
