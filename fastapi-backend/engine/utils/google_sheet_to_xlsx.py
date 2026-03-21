import os
import pandas as pd
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


def google_sheet_to_xlsx(spreadsheet_id, output_path):
    creds = Credentials.from_service_account_file(
        "credentials.json",
        scopes=SCOPES
    )

    service = build("sheets", "v4", credentials=creds)

    metadata = service.spreadsheets().get(
        spreadsheetId=spreadsheet_id
    ).execute()

    sheets = metadata.get("sheets", [])
    if not sheets:
        raise ValueError("No sheets found")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 2️⃣ Create XLSX with multiple sheets
    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        for sheet in sheets:
            sheet_name = sheet["properties"]["title"]

            result = service.spreadsheets().values().get(
                spreadsheetId=spreadsheet_id,
                range=sheet_name
            ).execute()

            values = result.get("values", [])
            if not values:
                continue  # skip empty tabs

            df = pd.DataFrame(values[1:], columns=values[0])
            df.to_excel(writer, sheet_name=sheet_name, index=False)

    return output_path
