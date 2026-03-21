import pandas as pd
import numpy as np

def normalize_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df = df.loc[:, ~df.columns.str.contains("^Unnamed")]

    df.columns = [str(c).strip() for c in df.columns]

    for col in df.columns:
        df[col] = pd.to_numeric(df[col], errors="ignore")

    return df


def _safe_series(df, column):
    if column not in df:
        return pd.Series(dtype=float)

    series = df[column]

    if column.startswith("Unnamed"):
        return pd.Series(dtype=float)

    return pd.to_numeric(series, errors="coerce")



def calculate_trend(df, column, date_col):
    if not date_col or date_col not in df:
        return "no_time_dimension"

    df = df.sort_values(by=date_col)
    values = _safe_series(df, column).dropna()

    if len(values) < 2:
        return "insufficient_data"

    return "up" if values.iloc[-1] > values.iloc[0] else "down"



def calculate_aggregation(df, column):
    values = _safe_series(df, column).dropna()

    if values.empty:
        return "no_numeric_data"

    return {
        "mean": float(values.mean()),
        "min": float(values.min()),
        "max": float(values.max())
    }



def calculate_ratio(df, col_a, col_b):
    a = _safe_series(df, col_a)
    b = _safe_series(df, col_b)

    values = pd.DataFrame({col_a: a, col_b: b}).dropna()
    values = values[values[col_b] != 0]

    if values.empty:
        return "invalid_ratio"

    return float((values[col_a] / values[col_b]).mean())



def calculate_distribution(df, column):
    if column not in df:
        return {}

    return df[column].value_counts().head(5).to_dict()

