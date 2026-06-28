<div align="center">

<img src="https://img.shields.io/badge/Intellexa-AI%20Business%20Intelligence-6366f1?style=for-the-badge&logoColor=white" alt="Intellexa" />

# 🧠 Intellexa.ai

### AI-Powered Business Intelligence & Decision Support Platform

*Transform raw datasets into actionable strategic insights — instantly.*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Render-009688?style=for-the-badge&logo=render&logoColor=white)](https://ai-powered-decision-support.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/LLM-Groq_Llama_3.1-f34f29?style=for-the-badge&logoColor=white)](https://groq.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

<br/>

> **Intellexa** is a production-grade, AI-driven BI platform that ingests CSV/XLSX datasets (or imports from Google Sheets) and automatically generates metrics, strategic insights, 30-day action plans, predictive forecasts, data quality reports, and an interactive RAG-powered chat assistant — all driven by Llama 3.1 via Groq.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture Deep Dive](#️-architecture-deep-dive)
- [🤖 AI/ML Pipeline](#-aiml-pipeline)
- [� API Reference](#-api-reference)
- [🗄️ Data Models](#️-data-models)
- [🎨 Frontend Pages](#-frontend-pages)
- [�🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Variables](#️-environment-variables)
- [� Security](#-security)
- [⚠️ Known Issues & Current Limitations](#️-known-issues--current-limitations)
- [� Improvements & Production Hardening](#-improvements--production-hardening)
- [🔭 Future Scope & Roadmap](#-future-scope--roadmap)
- [🏭 Technologies That Will Take This to the Next Level](#-technologies-that-will-take-this-to-the-next-level)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Automated Data Analysis
- Upload **CSV** or **XLSX** files — or import directly from **Google Sheets**
- LLM-driven metric selection: the model decides which metrics are actually meaningful
- Executes 4 metric types: `aggregation`, `ratio`, `trend`, `distribution`
- Dual confidence scoring: **Data Confidence** (completeness + size) + **AI Confidence** (weighted metric quality)

### 🤖 RAG-Powered AI Assistant
- **Document-specific chat** with full processed context injected per query
- **Global cross-document chat** across all user datasets
- Automatic question classification: `explanation / recommendation / visualization / prediction`
- Dynamic **inline chart generation** from natural language queries

</td>
<td width="50%">

### 📈 Strategic Intelligence Engine
- **Top Insights** — each with risk assessment and a recommended action
- **30-Day Action Plans** derived from real metric patterns
- **Predictive Forecasts** — trend direction, confidence level, business impact
- **Data Quality Analysis** — severity-rated issues with fix recommendations

### 🗂️ Document Registry & Export
- Filterable / sortable metrics explorer table
- **One-click PDF report** generation (html2canvas + jsPDF)
- **CSV export** for processed metrics
- Persistent, per-document chat history with chart replay
- Full document lifecycle: upload → rename → delete

</td>
</tr>
</table>

---

## 🏗️ Architecture Deep Dive

```
┌──────────────────────────────────────────────────────────────────────┐
│                           INTELLEXA.AI                               │
├───────────────────────────────┬──────────────────────────────────────┤
│      FRONTEND (Next.js 16)    │          BACKEND (FastAPI)           │
│                               │                                      │
│  Clerk Auth (ClerkProvider)   │   main.py  ← CORS, global handler   │
│  DashboardContext (React ctx) │                                      │
│  ThemeContext (dark/light)    │   /api/users    → users.py           │
│  Recharts (all charts)        │   /api/documents→ documents.py       │
│  jsPDF + html2canvas (export) │   /api/chat     → chat.py           │
│  react-markdown (chat render) │                                      │
│  Tailwind CSS v4              │   ┌──────────────────────────────┐   │
│                               │   │       AI ENGINE              │   │
│  next.config.ts rewrites:     │   │                              │   │
│  /api/* → FastAPI backend     │   │  ai_planner.py   (LLM)       │   │
│                               │   │  executor.py     (Pandas)    │   │
│                               │   │  insight_generator.py (LLM)  │   │
│                               │   │  action_plan.py  (LLM)       │   │
│                               │   │  predictor.py    (LLM)       │   │
│                               │   │  quality_analyst.py (LLM)    │   │
│                               │   │  chart_generator.py (LLM)    │   │
│                               │   │  ai_confidence.py (formula)  │   │
│                               │   └──────────────┬───────────────┘   │
│                               │                  │                   │
│                               │   ┌──────────────▼───────────────┐   │
│                               │   │   Groq LLM Layer             │   │
│                               │   │   llm_call_fn()  → JSON      │   │
│                               │   │   llm_call_text()→ string    │   │
│                               │   │   Model fallback chain       │   │
│                               │   └──────────────────────────────┘   │
│                               │                                      │
│                               │   ┌──────────────────────────────┐   │
│                               │   │   Persistence Layer          │   │
│                               │   │   MongoDB Atlas (metadata)   │   │
│                               │   │   Local JSON files (data)    │   │
│                               │   │   Google Sheets API (import) │   │
│                               │   └──────────────────────────────┘   │
└───────────────────────────────┴──────────────────────────────────────┘
```

### Request Flow — How a user message reaches the AI

```
Browser (Next.js)
  → /api/chat/ask (Next.js route rewrite)
  → FastAPI POST /api/chat/ask
    → chat.py router
      → chat_service.ask_document_chat()
        → load processed JSON from disk
        → classifier.classify_question()      [LLM call #1 — text mode]
        → prompt_builder.build_system_prompt()
        → llm_call_text(system_prompt + question) [LLM call #2 — text mode]
        → if category=="visualization":
            chart_generator.generate_chart_config() [LLM call #3 — JSON mode]
        → save ChatSession to MongoDB
  → return { answer, category, chart_config }
Browser renders markdown answer + optional Recharts chart
```

### Request Flow — File Upload to Dashboard

```
User drops CSV → POST /api/documents/upload (multipart)
  → Save raw file to storage/raw/<uuid>.csv
  → process_file_and_store()
      1. file_reader.read_file()              [Pandas]
      2. context_builder.build_ai_context()   [Pandas + schema inference]
      3. ai_planner.ask_ai_what_to_calculate()[LLM — JSON mode]
      4. executor.execute_metrics()           [Pandas calculators]
      5. ai_confidence.calculate_ai_confidence() [Formula]
      6. insight_generator.generate_top_insights() [LLM — JSON mode]
      7. action_plan.generate_30_day_plan()   [LLM — JSON mode]
      8. quality_analyst.generate_quality_suggestions() [LLM — JSON mode]
      9. predictor.generate_predictions()     [LLM — JSON mode]
     10. context_snapshot.build_context_snapshot() [in-memory]
     11. storage.save_processed_json()        [disk write]
     12. storage.save_context_json()          [disk write]
     13. db_ops.save_document_record()        [MongoDB write]
  → return { document_id, processed_path, context_path }
DashboardContext refreshes → new document appears in UI
```

---

## 🤖 AI/ML Pipeline

The intelligence layer runs **5 LLM calls + 1 Pandas execution** stage per uploaded file.

### Stage 1 — Context Building (`context_builder.py`)

Analyzes the raw DataFrame to produce a structured summary passed to every downstream LLM:

```python
{
  "row_count": int,
  "columns": ["col1", "col2", ...],
  "column_types": { "col": "number" | "date" | "string" },
  "numeric_columns": [...],
  "date_columns": [...],
  "numeric_summary": { "col": { "mean", "min", "max", "std" } },
  "data_confidence": float,   # (1 - missing_ratio) * min(rows/100, 1.0) * 100
  "sample_rows": [first 5 rows as dicts]
}
```

### Stage 2 — LLM Metric Planning (`ai_planner.py`)

The LLM receives the context and decides **which metrics are worth computing**. Returns a validated JSON plan.

| Metric Type | Description | Chart Type |
|:------------|:------------|:-----------|
| `aggregation` | Mean / min / max of a numeric column | Bar |
| `ratio` | Average of (colA / colB), zero-division protected | Bar |
| `trend` | First vs last value direction (requires date column) | Line |
| `distribution` | Top-5 value frequency | Pie |

Schema validation (`schema_validation.py`) checks the plan before execution. Falls back to a default aggregation if the LLM returns invalid JSON after 2 retries.

### Stage 3 — Metric Execution (`executor.py` + `calculators.py`)

Pure Pandas. The plan is iterated and each metric type dispatched to its calculator function. Errors per metric are caught individually — one bad metric does not abort the whole pipeline.

### Stage 4 — AI Confidence Score (`ai_confidence.py`)

```
score = (0.6 × data_confidence/100 + 0.4 × metric_quality) × 100

metric_quality = Σ(weight × has_values) / Σ(weight)
  where weight: high=1.0, medium=0.7, low=0.4
```

### Stage 5 — Parallel LLM Generation (currently sequential)

Four independent LLM calls produce the intelligence layer:

| Module | Output | Format |
|:-------|:-------|:-------|
| `insight_generator.py` | Top insights with risk + action | `[{insight, risk, action}]` |
| `action_plan.py` | 30-day prioritized action items | `["Action 1", ...]` |
| `predictor.py` | Trend forecasts with confidence | `[{target, trend, confidence, reasoning, impact}]` |
| `quality_analyst.py` | Data quality issues + fixes | `{quality_score, [{issue, severity, recommendation, benefit}]}` |

### LLM Layer (`llm_groq.py`)

Uses the OpenAI client pointed at Groq's API endpoint for ultra-fast inference:

```python
GROQ_MODELS = [
    "llama-3.1-8b-instant",  # Primary: ~200ms, temperature 0.2/0.3
    "mixtral-8x7b-32768",    # Fallback on BadRequestError
]
```

**Two modes:**
- `llm_call_fn(prompt) → dict` — strict JSON mode with markdown fence stripping and regex fallback extraction
- `llm_call_text(prompt) → str` — free-text mode for chat answers, classification, summaries

### Chat RAG Architecture

```
Document Context (processed JSON, ~full file)
         ↓
 classify_question() → "explanation" | "recommendation" | "visualization" | "prediction"
         ↓
 build_system_prompt(category, context, session.summary)
         ↓ adds chart-json instructions if visualization
 llm_call_text(system_prompt + user_question)
         ↓
 [if visualization] generate_chart_config() → Recharts-compatible JSON
         ↓
 Persist to ChatSession (MongoDB embedded docs)
```

---

## 📡 API Reference

### Users

| Method | Endpoint | Body / Params | Response |
|:-------|:---------|:--------------|:---------|
| `POST` | `/api/users` | `{ clerkUserId }` | `{ id, clerkUserId, createdAt }` |

### Documents

| Method | Endpoint | Body / Params | Response |
|:-------|:---------|:--------------|:---------|
| `POST` | `/api/documents/upload` | `multipart: file, clerkUserId, nickname?` | `{ document_id, original_filename, ... }` |
| `POST` | `/api/documents/upload/google-sheet` | `{ clerkUserId, sheetUrl, nickname }` | `{ document_id, ... }` |
| `GET` | `/api/documents` | `?clerkUserId=` | `[{ documentId, nickname, data_confidence, ai_confidence, ... }]` |
| `GET` | `/api/documents/processed` | `?clerkUserId=` | `{ datasets: [...], group_summary: {...} }` |
| `POST` | `/api/documents/processed/document` | `{ userId, documentId }` | `{ documentId, processed: {...} }` |
| `DELETE` | `/api/documents/{id}` | `?clerkUserId=` | `{ message }` |
| `PATCH` | `/api/documents/rename` | `{ clerkUserId, documentId, nickname }` | `{ message, nickname }` |

### Chat

| Method | Endpoint | Body | Response |
|:-------|:---------|:-----|:---------|
| `POST` | `/api/chat/ask` | `{ clerkUserId, documentId, question }` | `{ answer, category, chart_config }` |
| `POST` | `/api/chat/ask-global` | `{ clerkUserId, question }` | `{ answer, sources: [{id, name}] }` |
| `GET` | `/api/chat/history` | `?clerkUserId=&documentId=` | `{ messages: [{role, content, chart_config}] }` |

> Full Swagger UI available at `http://localhost:8000/docs` when the backend is running.

---

## 🗄️ Data Models

### MongoDB Collections

**`users`**
```typescript
{ _id: ObjectId, clerkUserId: string (unique, indexed), createdAt: Date }
```

**`documents`**
```typescript
{
  _id: ObjectId,
  userId: string,           // Clerk user ID — indexed
  originalFileName: string,
  nickname: string | null,
  processedPath: string,    // server local path: storage/processed/<name>.json
  contextPath: string,      // server local path: storage/context/<name>.json
  dataConfidence: float,    // 0–100
  aiConfidence: float,      // 0–100
  createdAt: Date           // indexed descending
}
```

**`chat_sessions`**
```typescript
{
  _id: ObjectId,
  userId: string,           // indexed
  documentId: string,       // "global" for cross-doc sessions — indexed
  summary: string,          // rolling summary (currently unused)
  messages: [{
    role: "user" | "assistant",
    content: string,
    chartConfig: object | null,
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date           // indexed descending
}
```

### Processed JSON Schema (stored on disk)

```json
{
  "file_name": "dataset.csv",
  "nickname": "Q3 Sales",
  "data_confidence": 87.5,
  "ai_confidence": 72,
  "metrics": [{
    "metric": "revenue_mean",
    "type": "aggregation",
    "chart": "bar",
    "data": { "labels": ["mean","min","max"], "values": [52000, 1200, 98000] },
    "importance": "high",
    "derived_from": ["revenue"],
    "ai_reason": "Core business metric"
  }],
  "insights": [{ "insight": "...", "risk": "...", "action": "..." }],
  "action_plan_30_days": ["Action 1", "Action 2"],
  "quality_analysis": {
    "quality_score": 80,
    "suggestions": [{ "issue": "...", "severity": "medium", "recommendation": "...", "benefit": "..." }]
  },
  "predictions": [{
    "target": "Revenue", "trend": "up", "confidence": "high",
    "reasoning": "...", "impact": "..."
  }]
}
```

---

## 🎨 Frontend Pages

| Route | Page | What it does |
|:------|:-----|:-------------|
| `/` | Landing | Navbar, Hero, Problem/Solution, Workflow, Features, Pricing, FAQ, CTA |
| `/dashboard/welcome` | Onboarding | 3-step guide for new users |
| `/dashboard/upload` | Upload | Drag-drop CSV/XLSX + Google Sheets URL import |
| `/dashboard/overview` | Overview | Group summary, stats cards, confidence rings, area chart |
| `/dashboard/insights` | Insights | Per-dataset metrics chart, quality panel, predictions, action plan. PDF + CSV export |
| `/dashboard/predictions` | Predictions | Forecast area chart, scenario planning, PDF export |
| `/dashboard/explorer` | Explorer | Sortable/filterable metrics table across all datasets |
| `/dashboard/ai-assistant` | AI Chat | Markdown chat, inline chart rendering, document/global mode toggle, fullscreen |
| `/dashboard/profile` | Profile | User account info via Clerk |

### Key Frontend Patterns

- **`DashboardContext`** — Single React context managing `documents` list + `processedData`. Fetches on mount, exposes `refreshDocuments()` and `refreshProcessedData()` for post-mutation sync.
- **`ThemeContext`** — Toggles `dark` class on `<html>`. Defaults to dark mode.
- **`ClerkUserSync`** — Fires one `POST /api/users` on first sign-in using `user.unsafeMetadata.synced` flag to prevent repeat calls.
- **`next.config.ts` rewrites** — All `/api/*` → `${NEXT_PUBLIC_API_BASE_URL}/api/*`. Frontend never calls the backend URL directly.
- **Chart rendering** — Recharts used for all charts. Chat charts rendered from inline ` ```chart-json ``` ` markdown blocks parsed by `react-markdown`.
- **PDF export** — `html2canvas` screenshots the dashboard DOM. oklch/oklab colors sanitized before print (CSS color space compatibility).

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| Frontend Framework | Next.js | 16.1.1 | App Router, SSR, API rewrite proxy |
| UI | React | 19.2.3 | Component-based UI |
| Styling | Tailwind CSS | 4.x | Utility-first, glassmorphism design system |
| Charts | Recharts | 3.6.0 | Interactive BI visualizations |
| Authentication | Clerk | 6.36.5 | Multi-tenant auth, OAuth/SSO/magic links |
| Theme | next-themes | 0.4.6 | Dark/light mode |
| Icons | Lucide React | 0.562.0 | Icon library |
| PDF Export | jsPDF + html2canvas | 4.2.1 | Client-side report generation |
| Markdown | react-markdown + remark-gfm | 10.1.0 | Chat message rendering |
| Backend Framework | FastAPI | 0.115.0 | High-performance async Python API |
| ASGI Server | Uvicorn | 0.30.6 | Production ASGI server |
| Database | MongoDB Atlas | — | Cloud NoSQL, flexible schema |
| ODM | Mongoengine | 0.28.2 | MongoDB object-document mapper |
| LLM Provider | Groq | — | Ultra-fast LLM inference |
| Primary Model | Llama 3.1 (8B Instant) | — | Metric planning, insights, chat |
| Fallback Model | Mixtral 8x7B | — | Reasoning fallback |
| Data Processing | Pandas | 2.2.3 | DataFrame operations, metric calculation |
| Numerical | NumPy | 1.26.4 | Numerical helpers |
| Excel Support | openpyxl | 3.1.5 | XLSX file read/write |
| Google Integration | google-api-python-client | 2.149.0 | Google Sheets import via service account |
| Environment | python-dotenv | 1.0.1 | Env var management |

---

## 📁 Project Structure

```
intellexa-ai/
├── fastapi-backend/
│   ├── main.py                      # FastAPI app: CORS, routers, global error handler
│   ├── requirements.txt
│   ├── .env                         # GROQ_API_KEY, MONGODB_URI
│   ├── credentials.json             # Google Service Account (not committed)
│   │
│   ├── engine/
│   │   ├── ai/
│   │   │   ├── ai_planner.py        # LLM decides which metrics to compute
│   │   │   ├── ai_confidence.py     # Weighted confidence scoring
│   │   │   ├── insight_generator.py # Insights + risk + recommended action
│   │   │   ├── action_plan.py       # 30-day strategic action plan
│   │   │   ├── predictor.py         # Predictive trend forecasts
│   │   │   ├── quality_analyst.py   # Data quality scoring + suggestions
│   │   │   └── chart_generator.py   # Dynamic chart config from natural language
│   │   │
│   │   ├── chat/
│   │   │   ├── chat_service.py      # Document-specific RAG chat
│   │   │   ├── global_chat_service.py # Cross-document aggregated chat
│   │   │   ├── classifier.py        # Question type → 4 categories
│   │   │   ├── prompt_builder.py    # System prompt construction
│   │   │   └── question_router.py   # (dead code — not imported)
│   │   │
│   │   ├── context/
│   │   │   ├── context_builder.py   # DataFrame → AI context dict
│   │   │   ├── context_snapshot.py  # Lightweight snapshot for chat
│   │   │   └── group_summary.py     # Cross-dataset executive summary
│   │   │
│   │   ├── db/
│   │   │   ├── db.py                # MongoDB Atlas connection init
│   │   │   ├── db_ops.py            # get_or_create_user, save_document_record
│   │   │   └── models.py            # User, DocumentFile, ChatSession, ChatMessage
│   │   │
│   │   ├── llm/
│   │   │   └── llm_groq.py          # Groq client, fallback chain, JSON/text modes
│   │   │
│   │   ├── routes/
│   │   │   ├── users.py             # POST /api/users
│   │   │   ├── documents.py         # Upload, list, get, delete, rename endpoints
│   │   │   └── chat.py              # ask, ask-global, history endpoints
│   │   │
│   │   ├── schema/
│   │   │   └── schema.py            # Column type inference (number/date/string)
│   │   │
│   │   ├── storage/
│   │   │   ├── file_reader.py       # CSV/XLSX → DataFrame
│   │   │   ├── process_and_store.py # Full 12-step processing pipeline
│   │   │   └── storage.py           # JSON save/load, NaN/Inf sanitizer
│   │   │
│   │   └── utils/
│   │       ├── calculators.py       # aggregation, ratio, trend, distribution
│   │       ├── executor.py          # Dispatches AI plan to calculators
│   │       ├── extractors.py        # Google Sheets ID from URL
│   │       ├── google_sheet_to_xlsx.py # Sheets API → XLSX
│   │       └── schema_validation.py # Validates AI plan JSON
│   │
│   └── storage/                     # Runtime file storage
│       ├── raw/                     # Original uploaded files
│       ├── processed/               # Full processed JSON per document
│       └── context/                 # Context snapshots for chat
│
└── frontend/
    ├── app/
    │   ├── layout.tsx               # ClerkProvider + ThemeProvider + ClerkUserSync
    │   ├── page.tsx                 # Landing page
    │   └── dashboard/
    │       ├── layout.tsx           # Dashboard shell (Sidebar + Header + DashboardProvider)
    │       └── [route]/page.tsx     # All 9 dashboard pages
    ├── components/
    │   ├── dashboard/               # Sidebar, AppHeader, StatsCard, DatasetSelector
    │   ├── landing/                 # Hero, Features, Pricing, FAQ sections
    │   ├── auth/                    # ClerkUserSync
    │   └── ui/                      # Atomic UI components
    ├── context/
    │   ├── DashboardContext.tsx     # Global state (documents + processedData)
    │   └── ThemeContext.tsx         # Dark/light theme toggle
    └── lib/
        └── chartUtils.ts           # Chart rendering helpers
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Python 3.10+
- MongoDB Atlas cluster (free tier works)
- Groq API Key — [console.groq.com](https://console.groq.com/)
- Clerk Account — [clerk.com](https://clerk.com/)

### 1. Clone

```bash
git clone https://github.com/your-username/intellexa-ai.git
cd intellexa-ai
```

### 2. Backend

```bash
cd fastapi-backend
python -m venv venv
source venv/bin/activate       # Linux/macOS
# venv\Scripts\activate        # Windows

pip install -r requirements.txt

# Create .env from template below, then:
uvicorn main:app --reload --port 8000
```

API: `http://localhost:8000` | Docs: `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend
pnpm install

# Create .env.local from template below, then:
pnpm dev
```

App: `http://localhost:3000`

---

## ⚙️ Environment Variables

### `fastapi-backend/.env`

```env
GROQ_API_KEY=gsk_your_key_here
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?appName=Intellexa
```

### `frontend/.env.local`

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/welcome
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Google Sheets (optional)

Place your service account JSON at `fastapi-backend/credentials.json`.  
The target Google Sheet must be shared with the service account email or set to "Anyone with link can view."

---

## 🔐 Security

- **Authentication** — Clerk handles all auth: OAuth (Google/GitHub), SSO, magic links, MFA
- **Multi-tenancy** — Every MongoDB query is scoped to `userId=clerkUserId`. Users are isolated at the data layer
- **Database** — MongoDB Atlas with TLS 1.2+ encryption in transit
- **Secrets** — All API keys stored in `.env` files; never committed to source control
- **File Validation** — Only `.csv` and `.xlsx` accepted; filenames sanitized with `re.sub(r"[^\w.\-]", "_", ...)`
- **CORS** — Configured in `main.py`. `allow_origins=["*"]` is dev-only; restrict to your domain in production

> ⚠️ **Critical gap**: The FastAPI backend currently trusts the `clerkUserId` value from the request body with no JWT verification. See Improvements section below.

---

## ⚠️ Known Issues & Current Limitations

These are real issues found by reviewing every file in the codebase. Fix these before going to production.

### 🔴 Critical

**1. No backend JWT verification**
The API accepts `clerkUserId` as a plain string in request body/params. Anyone who knows another user's Clerk ID can read, delete, or modify their documents. Fix: add a Clerk JWT middleware dependency to FastAPI that validates the `Authorization: Bearer <token>` header.

**2. Filesystem-dependent storage**
Processed JSON files are written to the server's local `storage/` directory. On Render free tier (and most ephemeral platforms), the filesystem is wiped on every deploy or restart. All processed data is **lost silently** — MongoDB records point to non-existent files. Fix: store processed data in MongoDB as a document field (small datasets) or object storage (S3/GCS/R2).

**3. CORS wildcard in production**
`allow_origins=["*"]` in `main.py` allows any domain to make cross-origin requests to the API.

### 🟡 Medium

**4. Sequential LLM calls during upload**
Insights, action plan, quality analysis, and predictions are 4 independent LLM calls running one after another. Total latency ≈ 4× a single call. They can be parallelized with `asyncio.gather()`, reducing upload processing time by ~60–70%.

**5. Prediction page uses hardcoded mock data**
`/dashboard/predictions` renders a hardcoded `predictionData` array in the component, not the actual LLM predictions stored in `processed.predictions`. The real predictions appear only on the Insights page.

**6. Chat session summary never written**
`ChatSession.summary` is passed to `build_system_prompt()` but nothing in the codebase ever writes to it. Long chats will drift and lose context. A rolling summarization strategy (every N messages) should populate this field.

**7. Full processed JSON used as chat context**
`chat_service.py` loads the entire `processed.json` (which can be large) and injects it directly into the LLM prompt on every message. This is expensive in tokens and can exceed context limits for large datasets.

### 🟢 Low

**8. Dead code** — `engine/chat/question_router.py` is never imported anywhere; duplicates `classifier.py` functionality.

**9. Chart classification is a full LLM call** — `classifier.py` calls the LLM for a one-word response (`explanation / recommendation / visualization / prediction`). This is overkill; a simple keyword regex or a tiny local classifier would be significantly cheaper and faster.

**10. Google Sheets file left on disk after processing** — The downloaded XLSX file is saved to `storage/raw/` but never cleaned up post-processing.

---

## 🚀 Improvements & Production Hardening

Ordered by impact. These changes transform the project from a working prototype into a production-grade system.

### 1. Backend JWT Auth (Priority: CRITICAL)

Add a FastAPI dependency that verifies Clerk JWTs on every request:

```python
# engine/auth/clerk_auth.py
from fastapi import Depends, HTTPException, Header
from clerk_backend_api import Clerk

clerk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

async def get_current_user(authorization: str = Header(...)) -> str:
    token = authorization.removeprefix("Bearer ")
    try:
        claims = clerk.jwt.verify(token)
        return claims["sub"]  # This is the clerkUserId
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# In routes:
@router.post("/upload")
async def upload(clerkUserId: str = Depends(get_current_user), ...):
```

### 2. Persistent Storage with MongoDB GridFS or S3

Replace local file I/O. Store processed JSON directly in MongoDB for small-medium datasets:

```python
# Store processed data in the DocumentFile model
class DocumentFile(Document):
    processedData = DictField()   # replace processedPath
    contextData = DictField()     # replace contextPath
```

Or for large datasets, use AWS S3 / Cloudflare R2 with presigned URLs.

### 3. Async Parallel LLM Calls

Replace 4 sequential `llm_call_fn` calls with concurrent execution:

```python
import asyncio
from functools import partial

async def process_file_and_store_async(...):
    loop = asyncio.get_event_loop()
    
    insights_task = loop.run_in_executor(None, generate_top_insights, ...)
    plan_task     = loop.run_in_executor(None, generate_30_day_plan, ...)
    quality_task  = loop.run_in_executor(None, generate_quality_suggestions, ...)
    predict_task  = loop.run_in_executor(None, generate_predictions, ...)
    
    insights, plan, quality, predictions = await asyncio.gather(
        insights_task, plan_task, quality_task, predict_task
    )
```
**Expected speedup: ~3–4× on the processing pipeline.**

### 4. Background Task Processing

Move the heavy pipeline out of the HTTP request cycle using FastAPI's `BackgroundTasks` or a dedicated task queue:

```python
from fastapi import BackgroundTasks

@router.post("/upload")
async def upload(background_tasks: BackgroundTasks, ...):
    doc_id = create_pending_document_record()
    background_tasks.add_task(process_file_and_store, file_path, clerk_user_id, doc_id)
    return { "document_id": doc_id, "status": "processing" }
```

Pair with a **Celery + Redis** queue for reliability and retry logic at scale.

### 5. Replace Classifier LLM Call with Regex/Keywords

The `classify_question()` function makes a full LLM round-trip for a one-word response. Use a fast keyword matcher instead:

```python
VISUALIZATION_KEYWORDS = ["chart", "graph", "plot", "visualize", "show me", "trend line"]
PREDICTION_KEYWORDS = ["predict", "forecast", "future", "will", "next month"]
RECOMMENDATION_KEYWORDS = ["suggest", "recommend", "should", "improve", "optimize"]

def classify_question(question: str) -> str:
    q = question.lower()
    if any(k in q for k in VISUALIZATION_KEYWORDS): return "visualization"
    if any(k in q for k in PREDICTION_KEYWORDS):    return "prediction"
    if any(k in q for k in RECOMMENDATION_KEYWORDS): return "recommendation"
    return "explanation"
```

**Saves 1 LLM call per chat message. ~200ms faster per response.**

### 6. Chat Context Window Management

Instead of injecting the full `processed.json` into every chat message, build a token-aware context:

```python
def build_chat_context(processed_data: dict, question: str, max_tokens=2000) -> dict:
    # Always include: metrics summary, key insights, action plan
    # Include predictions only if question is about forecasting
    # Include quality_analysis only if question is about data issues
```

### 7. Rolling Chat Summarization

Populate `ChatSession.summary` to prevent context drift in long conversations:

```python
# In chat_service.py, after every 10 message pairs:
if len(chat.messages) % 20 == 0:
    summary_prompt = f"Summarize this conversation in 100 words:\n{recent_messages}"
    chat.summary = llm_call_text(summary_prompt)
    chat.save()
```

### 8. Fix CORS for Production

```python
# main.py
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 9. Rate Limiting

Prevent LLM cost abuse and API hammering:

```python
# pip install slowapi
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/upload")
@limiter.limit("5/minute")
async def upload(...): ...

@router.post("/ask")
@limiter.limit("30/minute")
async def ask_chat(...): ...
```

### 10. Structured Logging + Observability

Replace print/basic logging with structured JSON logs:

```python
import structlog
logger = structlog.get_logger()
logger.info("file_processed", file=file_name, rows=len(df), confidence=data_confidence)
```

Add **Sentry** for error tracking and **OpenTelemetry** for distributed tracing.

---

## 🔭 Future Scope & Roadmap

### Phase 1 — Core Stability (1–2 months)

| Feature | Description | Effort |
|:--------|:------------|:-------|
| Backend JWT auth | Verify Clerk tokens on every endpoint | Low |
| Persistent storage | Move processed JSON to MongoDB or S3 | Medium |
| Async pipeline | Parallelize 4 LLM generation calls | Low |
| Fix predictions page | Wire up real LLM predictions to the chart | Low |
| Chat summarization | Populate `session.summary` every N turns | Low |
| Remove dead code | Delete `question_router.py` | Trivial |
| Rate limiting | Protect LLM endpoints from abuse | Low |

### Phase 2 — Intelligence Upgrade (2–4 months)

**Real ML Models alongside LLM**
- Replace the `trend` metric (currently just first vs last value comparison) with actual time-series models: **Prophet** (Facebook) or **statsmodels ARIMA**
- Add **scikit-learn** regression/classification for quantitative predictions instead of pure LLM reasoning
- Implement **anomaly detection** using Isolation Forest or Z-score methods on numeric columns

**Advanced RAG Architecture**
- Chunk processed data into semantic pieces and store as **vector embeddings** in **Pinecone** or **Qdrant**
- Use embedding-based retrieval to find the most relevant context sections per question instead of injecting the whole document
- Enable semantic search across ALL user documents (not just top-3 insights per doc)

**Agentic Workflows**
- Implement a **ReAct agent** that can chain: analyze → search → calculate → summarize
- Use **LangChain** or **LlamaIndex** as the orchestration layer
- Allow the AI to run multi-step analyses: "Compare Q1 vs Q2, identify the biggest drop, generate a recovery plan"

### Phase 3 — Enterprise Features (4–8 months)

| Feature | Description |
|:--------|:------------|
| **Multi-user Workspaces** | Team accounts with role-based access (owner, analyst, viewer) |
| **Real-time Collaboration** | Multiple users viewing/chatting on the same dataset (WebSockets) |
| **Scheduled Reports** | Cron-triggered weekly/monthly email summaries |
| **SQL / Database Integration** | Connect to PostgreSQL, MySQL, BigQuery, Snowflake directly |
| **Data Pipeline Automation** | Auto-refresh datasets from connected data sources |
| **Custom LLM Prompt Templates** | Domain-specific prompts (healthcare, finance, e-commerce) |
| **Audit Logs** | Full action history per document per user |
| **Usage Analytics** | LLM token usage, cost tracking per user/workspace |
| **Webhook Notifications** | Slack/Teams alerts when analysis completes or anomaly detected |
| **Multi-model LLM Router** | Route queries to GPT-4, Claude, Gemini based on task type + cost |
| **Fine-tuned Domain Models** | Fine-tune a Llama model on BI-specific reasoning tasks |
| **White-labeling** | Custom branding, custom domain support for SaaS resellers |

### Phase 4 — Advanced AI/ML (8–12 months)

**Computer Vision for Data**
- Parse data from **PDF reports**, images of tables, and scanned documents using multimodal models (GPT-4V, Gemini Vision)
- Auto-extract structured tables from uploaded images

**Natural Language to SQL (NL2SQL)**
- Let users ask "show me all customers who bought more than 5 times in Q3" against their raw data
- Generate and execute safe, sandboxed SQL/Pandas queries from natural language

**Causal Inference**
- Move beyond correlation → implement **causal analysis** to answer "does X cause Y?" using DoWhy or CausalML

**Federated Learning (Enterprise)**
- Allow organizations to train local models on their data without it leaving their servers

---

## 🏭 Technologies That Will Take This to the Next Level

These are the specific tools and concepts — with justification — that would elevate Intellexa from a strong prototype to a production-grade, enterprise-ready platform.

### AI & LLM Layer

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **LangChain / LlamaIndex** | Agent orchestration, tool use, multi-step reasoning chains, memory management — replaces the current raw prompt approach |
| **Pinecone / Qdrant / Weaviate** | Vector database for semantic search over chunked documents — enables proper RAG instead of full-context injection |
| **OpenAI Embeddings / `sentence-transformers`** | Convert document chunks to embeddings for vector retrieval |
| **LangSmith** | LLM observability — trace every prompt, see token counts, debug hallucinations, A/B test prompts |
| **Llama 3.3 / Llama 3.1 70B** | Upgrade from 8B to 70B for dramatically better reasoning on complex business datasets (still via Groq) |
| **Anthropic Claude / GPT-4o** | Multi-model routing: use Claude for long-context analysis, GPT-4o for vision/multimodal, Llama for speed |
| **DSPy** | Programmatic prompt optimization — auto-tune prompts to maximize structured output reliability |
| **OpenAI Structured Outputs** | Replace the current `llm_call_fn` JSON extraction heuristics with guaranteed schema-compliant JSON responses |

### ML & Data Science Layer

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **scikit-learn** | Classification, regression, clustering on actual data columns — real predictive models instead of LLM guessing trends |
| **Prophet (Meta)** | Production-grade time-series forecasting — replace the current "first vs last value" trend metric |
| **statsmodels** | ARIMA, SARIMA models for seasonal time series, statistical significance tests |
| **PyOD** | Outlier/anomaly detection library — detect unusual rows in datasets before analysis |
| **Polars** | Drop-in Pandas replacement with 10–100× performance on large files (Rust-based, lazy evaluation) |
| **Great Expectations** | Data quality validation framework — replace the LLM-based quality analysis with deterministic rule-based checks |
| **Apache Arrow** | In-memory columnar format for zero-copy data interchange between Python, databases, and APIs |

### Backend & Infrastructure

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **Celery + Redis** | Async task queue — offload 5-LLM-call pipeline to background workers with retry, progress tracking |
| **FastAPI WebSockets** | Real-time streaming responses for chat (word-by-word LLM output), live processing progress |
| **AWS S3 / Cloudflare R2** | Persistent, scalable object storage — replace local `storage/` directory |
| **Redis (caching)** | Cache processed analysis results; prevent re-running the pipeline on unchanged data |
| **PostgreSQL + SQLAlchemy** | Relational database for structured metadata, team accounts, audit logs (complement MongoDB) |
| **Alembic** | Database migration management for the PostgreSQL schema |
| **Docker + Docker Compose** | Containerize backend + worker + Redis — reproducible dev and production environments |
| **Kubernetes (K8s)** | Horizontal scaling of API pods + worker pods under load |
| **Nginx** | Reverse proxy, SSL termination, request buffering, static file serving |
| **GitHub Actions CI/CD** | Automated testing, linting, Docker builds, and deployment on every push |

### Security

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **Clerk JWT + FastAPI Dependency** | Verify every API request with a signed JWT — close the current auth gap |
| **slowapi / Redis-based rate limiting** | Protect LLM endpoints from cost abuse and DDoS |
| **python-jose / PyJWT** | Lightweight alternative for JWT verification if moving away from Clerk SDK |
| **Vault (HashiCorp) / AWS Secrets Manager** | Centralized secrets management — replace `.env` files in production |
| **OWASP ZAP / Bandit** | Security scanning for the API and Python code |

### Frontend

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **Zustand or TanStack Query** | Replace the manual `DashboardContext` fetch pattern with a proper cache + invalidation strategy |
| **Vercel AI SDK** | Built-in streaming, `useChat` hook, tool call rendering — replaces the custom chat fetch logic |
| **D3.js** | For highly custom, complex visualizations beyond what Recharts provides |
| **shadcn/ui** | Production-quality accessible UI component library (built on Radix + Tailwind) |
| **Storybook** | Component development and documentation in isolation |
| **Vitest + Testing Library** | Unit and integration tests for React components |
| **Playwright** | End-to-end browser tests for critical user flows (upload → analysis → chat) |

### Observability & DevOps

| Technology | Why It Belongs Here |
|:-----------|:-------------------|
| **Sentry** | Error tracking with stack traces, performance monitoring, release health |
| **OpenTelemetry + Jaeger** | Distributed tracing across Next.js → FastAPI → Groq → MongoDB |
| **Grafana + Prometheus** | Real-time metrics dashboards: API latency, LLM call durations, error rates |
| **structlog** | Structured JSON logging for searchable, parseable production logs |
| **Datadog / New Relic** | All-in-one APM if you want a managed solution |

---

## 🚢 Deployment

### Backend — Render / Railway / Fly.io

1. Set env vars: `GROQ_API_KEY`, `MONGODB_URI`
2. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Root directory: `fastapi-backend/`

> ⚠️ On Render free tier the filesystem is ephemeral. Processed files will be lost on restart. Use MongoDB or S3 for storage before deploying seriously.

### Frontend — Vercel (recommended)

1. Set all env vars (`NEXT_PUBLIC_*`, `CLERK_SECRET_KEY`)
2. Build command: `pnpm build`
3. Root directory: `frontend/`
4. Update `NEXT_PUBLIC_API_BASE_URL` to your deployed backend URL

### MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist backend server IP (or `0.0.0.0/0` for dynamic IPs)
3. Create a DB user and copy URI to `MONGODB_URI`
4. Collections are auto-created on first use

### Docker Compose (local)

```yaml
# docker-compose.yml (example)
services:
  backend:
    build: ./fastapi-backend
    ports: ["8000:8000"]
    env_file: ./fastapi-backend/.env
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    env_file: ./frontend/.env.local
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

---

## 🤝 Contributing

```bash
# Fork the repo, then:
git clone https://github.com/your-username/intellexa-ai.git
git checkout -b feature/your-feature-name

# Backend changes
cd fastapi-backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend changes
cd frontend
pnpm install && pnpm dev

# Commit
git commit -m "feat: short description"
git push origin feature/your-feature-name
# Open a Pull Request
```

**Tips:**
- Use `http://localhost:8000/docs` for live API testing (Swagger UI)
- MongoDB collections are auto-created on first use — no schema migrations needed for new fields
- The `process_file_and_store()` function is the heart of the backend — start there to understand the full pipeline

---

## 📄 License

Distributed under the **MIT License**.

---

<div align="center">

**Built with 💜 by Vighnesh Salunkhe**

*From raw data to executive insight — in seconds.*

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/Groq-f34f29?style=flat-square&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)

</div>
