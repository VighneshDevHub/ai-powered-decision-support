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

> Intellexa is a high-performance, AI-driven BI platform that ingests CSV/XLSX datasets and automatically generates metrics, strategic insights, 30-day action plans, predictive forecasts, and an interactive neural assistant — all powered by Llama 3.1 via Groq.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Variables](#️-environment-variables)
- [📡 API Reference](#-api-reference)
- [🤖 AI Pipeline](#-ai-pipeline)
- [🗄️ Data Models](#️-data-models)
- [🎨 Frontend Pages](#-frontend-pages)
- [🔐 Security](#-security)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Automated Data Analysis
- Upload **CSV** or **XLSX** files (or import from **Google Sheets**)
- AI-driven metric selection — the LLM decides what's worth calculating
- Executes aggregation, ratio, trend, and distribution metrics
- Dual confidence scoring: **Data Confidence** + **AI Confidence**

### 🤖 Neural AI Assistant
- **Document-specific chat** with RAG (Retrieval-Augmented Generation)
- **Global cross-document chat** across all your datasets
- Automatic question classification (explanation / recommendation / visualization / prediction)
- Dynamic **chart generation** from natural language queries

</td>
<td width="50%">

### 📈 Strategic Intelligence
- **Top Insights** with risk assessment and recommended actions
- **30-Day Action Plans** generated from your data patterns
- **Predictive Forecasts** — trend direction, confidence, and reasoning
- **Data Quality Analysis** with improvement suggestions

### 🗂️ Data Registry & Export
- High-performance explorer with filtering and sorting
- **One-click PDF report** generation (jsPDF + html2canvas)
- **CSV export** for processed metrics
- Persistent chat history per document

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INTELLEXA.AI                             │
├──────────────────────────┬──────────────────────────────────────┤
│     FRONTEND (Next.js)   │        BACKEND (FastAPI)             │
│                          │                                      │
│  ┌────────────────────┐  │  ┌──────────────────────────────┐   │
│  │  Clerk Auth        │  │  │  API Routes                  │   │
│  │  Dashboard Pages   │──┼─▶│  /api/documents              │   │
│  │  Recharts Viz      │  │  │  /api/chat                   │   │
│  │  PDF/CSV Export    │  │  │  /api/users                  │   │
│  └────────────────────┘  │  └──────────┬───────────────────┘   │
│                          │             │                        │
│                          │  ┌──────────▼───────────────────┐   │
│                          │  │  AI Engine                   │   │
│                          │  │  ┌─────────┐ ┌────────────┐  │   │
│                          │  │  │ Planner │ │ Insights   │  │   │
│                          │  │  │ Metrics │ │ Predictor  │  │   │
│                          │  │  │ Quality │ │ ActionPlan │  │   │
│                          │  │  └────┬────┘ └─────┬──────┘  │   │
│                          │  └───────┼────────────┼──────────┘   │
│                          │          │            │              │
│                          │  ┌───────▼────────────▼──────────┐   │
│                          │  │  Groq LLM (Llama 3.1)         │   │
│                          │  │  Primary: llama-3.1-8b-instant │   │
│                          │  │  Fallback: mixtral-8x7b-32768  │   │
│                          │  └───────────────────────────────┘   │
│                          │                                      │
│                          │  ┌───────────────────────────────┐   │
│                          │  │  MongoDB Atlas                │   │
│                          │  │  users / documents / sessions │   │
│                          │  └───────────────────────────────┘   │
└──────────────────────────┴──────────────────────────────────────┘
```

### Data Processing Pipeline

```
Upload (CSV/XLSX/Google Sheets)
        │
        ▼
  Read with Pandas
        │
        ▼
  Build AI Context  ──────────────────────────────────────────────┐
  (column types, stats, confidence)                               │
        │                                                         │
        ▼                                                         │
  LLM: Plan Metrics  ◀── Groq Llama 3.1                          │
  (aggregation / ratio / trend / distribution)                    │
        │                                                         │
        ▼                                                         │
  Execute Metrics (Pandas)                                        │
        │                                                         │
        ▼                                                         │
  ┌─────┴──────────────────────────────────────────────────┐     │
  │  LLM Parallel Generation                               │     │
  │  ├── Top Insights + Risk Assessment                    │     │
  │  ├── 30-Day Action Plan                                │     │
  │  ├── Predictive Forecasts                              │     │
  │  └── Data Quality Suggestions                         │     │
  └─────┬──────────────────────────────────────────────────┘     │
        │                                                         │
        ▼                                                         │
  Save Processed JSON + Context Snapshot                         │
        │                                                         │
        ▼                                                         │
  Store Record in MongoDB  ◀───────────────────────────────────── ┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| **Frontend Framework** | Next.js | 16.1.1 | App Router, SSR, API routes |
| **UI Library** | React | 19.2.3 | Component-based UI |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS with glassmorphism |
| **Charts** | Recharts | 3.6.0 | Interactive data visualizations |
| **Authentication** | Clerk | 6.36.5 | Multi-tenant auth, OAuth/SSO |
| **Theme** | next-themes | 0.4.6 | Dark/light mode |
| **Icons** | Lucide React | 0.562.0 | Icon library |
| **PDF Export** | jsPDF + html2canvas | 4.2.1 | Report generation |
| **Markdown** | react-markdown + remark-gfm | 10.1.0 | Chat message rendering |
| **Backend Framework** | FastAPI | 0.115.0 | High-performance Python API |
| **ASGI Server** | Uvicorn | 0.30.6 | Production-grade ASGI server |
| **Database** | MongoDB Atlas | — | Cloud NoSQL database |
| **ODM** | Mongoengine | 0.28.2 | MongoDB object-document mapper |
| **LLM Provider** | Groq | 0.11.0 | Ultra-fast LLM inference |
| **LLM Model** | Llama 3.1 (8B) | — | Primary AI model |
| **LLM Fallback** | Mixtral 8x7B | — | Fallback reasoning model |
| **Data Processing** | Pandas | 2.2.3 | DataFrame operations |
| **Numerical** | NumPy | 1.26.4 | Numerical computations |
| **Excel Support** | openpyxl | 3.1.5 | XLSX file reading |
| **Google Sheets** | google-api-python-client | 2.149.0 | Google Sheets import |
| **Environment** | python-dotenv | 1.0.1 | Environment variable management |

---

## 📁 Project Structure

```
intellexa-ai/
├── 📂 fastapi-backend/              # Python FastAPI backend
│   ├── main.py                      # App entry point, CORS, route registration
│   ├── requirements.txt             # Python dependencies
│   ├── .env                         # Environment variables (not committed)
│   ├── credentials.json             # Google API credentials
│   │
│   ├── 📂 engine/
│   │   ├── 📂 ai/                   # AI/LLM processing modules
│   │   │   ├── ai_planner.py        # LLM-driven metric planning
│   │   │   ├── ai_confidence.py     # Confidence score calculation
│   │   │   ├── insight_generator.py # Strategic insight generation
│   │   │   ├── action_plan.py       # 30-day action plan generation
│   │   │   ├── predictor.py         # Predictive forecasting
│   │   │   ├── quality_analyst.py   # Data quality analysis
│   │   │   └── chart_generator.py   # Chart config generation
│   │   │
│   │   ├── 📂 chat/                 # Chat/RAG system
│   │   │   ├── chat_service.py      # Document-specific chat
│   │   │   ├── global_chat_service.py # Cross-document chat
│   │   │   ├── classifier.py        # Question type classifier
│   │   │   ├── prompt_builder.py    # System prompt construction
│   │   │   └── question_router.py   # Routes questions to handlers
│   │   │
│   │   ├── 📂 context/              # Context building
│   │   │   ├── context_builder.py   # Dataset structure analysis
│   │   │   ├── context_snapshot.py  # Lightweight context for chat
│   │   │   └── group_summary.py     # Cross-dataset summaries
│   │   │
│   │   ├── 📂 db/                   # Database layer
│   │   │   ├── db.py                # MongoDB connection
│   │   │   ├── db_ops.py            # CRUD operations
│   │   │   └── models.py            # Mongoengine document models
│   │   │
│   │   ├── 📂 llm/                  # LLM integration
│   │   │   └── llm_groq.py          # Groq client with fallback
│   │   │
│   │   ├── 📂 routes/               # FastAPI route handlers
│   │   │   ├── users.py             # User management
│   │   │   ├── documents.py         # File upload & processing
│   │   │   └── chat.py              # Chat endpoints
│   │   │
│   │   ├── 📂 schema/               # Data schemas
│   │   │   └── schema.py            # Column type inference
│   │   │
│   │   ├── 📂 storage/              # File I/O
│   │   │   ├── file_reader.py       # CSV/XLSX reader
│   │   │   ├── process_and_store.py # Full processing pipeline
│   │   │   └── storage.py           # JSON save/load utilities
│   │   │
│   │   └── 📂 utils/                # Utilities
│   │       ├── calculators.py       # Metric calculation functions
│   │       ├── executor.py          # AI plan executor
│   │       ├── extractors.py        # Google Sheets ID extractor
│   │       ├── google_sheet_to_xlsx.py # Sheets → XLSX converter
│   │       └── schema_validation.py # AI plan validation
│   │
│   └── 📂 storage/                  # Local file storage
│       ├── raw/                     # Original uploaded files
│       ├── processed/               # Processed JSON with metrics
│       └── context/                 # Context snapshots for chat
│
└── 📂 frontend/                     # Next.js frontend
    ├── package.json
    ├── 📂 app/
    │   ├── layout.tsx               # Root layout (Clerk + Theme)
    │   ├── page.tsx                 # Landing page
    │   └── 📂 dashboard/
    │       ├── layout.tsx           # Dashboard shell (Sidebar + Header)
    │       ├── page.tsx             # Dashboard home
    │       ├── upload/              # File upload interface
    │       ├── ai-assistant/        # Neural chat interface
    │       ├── explorer/            # Data registry explorer
    │       ├── insights/            # Strategic insights view
    │       ├── predictions/         # Predictive forecasts view
    │       ├── overview/            # Overview dashboard
    │       ├── profile/             # User profile
    │       └── welcome/             # Onboarding page
    │
    ├── 📂 components/
    │   ├── dashboard/               # Sidebar, AppHeader, StatsCard
    │   ├── landing/                 # Hero, Features, Pricing, FAQ
    │   ├── auth/                    # Auth-related components
    │   └── ui/                      # Atomic UI components
    │
    ├── 📂 context/
    │   ├── DashboardContext.tsx     # Global state (documents, datasets)
    │   └── ThemeContext.tsx         # Dark/light theme
    │
    └── 📂 lib/                      # Utility functions
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **Python** 3.10+
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Groq API Key** — [Get one free](https://console.groq.com/)
- **Clerk Account** — [Sign up](https://clerk.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/intellexa-ai.git
cd intellexa-ai
```

---

### 2. Backend Setup

```bash
cd fastapi-backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your keys (see Environment Variables section)

# Start the server
uvicorn main:app --reload --port 5000
```

The API will be available at `http://localhost:5000`  
Interactive docs at `http://localhost:5000/docs`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your keys (see Environment Variables section)

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`

---

## ⚙️ Environment Variables

### Backend — `fastapi-backend/.env`

```env
# Groq LLM API Key (required)
# Get yours at: https://console.groq.com/
GROQ_API_KEY=gsk_your_groq_api_key_here

# MongoDB Connection URI (required)
# Local: mongodb://localhost:27017/intellexa
# Atlas: mongodb+srv://user:pass@cluster.mongodb.net/?appName=YourApp
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Intellexa
```

### Frontend — `frontend/.env.local`

```env
# Clerk Authentication Keys (required)
# Get yours at: https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/welcome

# Backend API URL
# Development:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
# Production:
# NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com
```

---

## 📡 API Reference

### Users

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/users` | Create or retrieve a user by Clerk ID |

### Documents

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/documents/upload` | Upload and process a CSV/XLSX file |
| `POST` | `/api/documents/upload/google-sheet` | Import from a Google Sheets URL |
| `GET` | `/api/documents/` | List all documents for a user |
| `GET` | `/api/documents/processed` | Get all processed datasets + group summary |
| `POST` | `/api/documents/processed/document` | Get a single processed document |
| `DELETE` | `/api/documents/{document_id}` | Delete a document |
| `PATCH` | `/api/documents/rename` | Rename a document |

### Chat

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/chat/ask` | Ask a question about a specific document |
| `POST` | `/api/chat/ask-global` | Ask a question across all user documents |
| `GET` | `/api/chat/history` | Get chat history for a document |

> Full interactive API docs available at `/docs` (Swagger UI) and `/redoc` when the backend is running.

---

## 🤖 AI Pipeline

Intellexa's intelligence layer is built around a multi-step LLM pipeline using **Groq's Llama 3.1**:

### Step 1 — Context Building
The dataset is analyzed to extract:
- Column names and inferred types (number, date, categorical)
- Numeric statistics (mean, min, max, std)
- Row count and missing value ratio
- **Data Confidence Score** (0–100) based on completeness and size

### Step 2 — Metric Planning (LLM)
The LLM receives the dataset summary and decides which metrics are meaningful:

| Metric Type | Description |
|:------------|:------------|
| `aggregation` | Mean / min / max of a numeric column |
| `ratio` | Division between two numeric columns |
| `trend` | Direction over time (requires a date column) |
| `distribution` | Value frequency of a categorical or numeric column |

The plan is validated against a strict schema before execution. A fallback plan is used if the LLM response is invalid.

### Step 3 — Metric Execution (Pandas)
The validated plan is executed against the DataFrame using optimized Pandas operations.

### Step 4 — Parallel AI Generation (LLM)
Four independent LLM calls generate:

```
┌─────────────────────────────────────────────────────────┐
│  Top Insights     → Key findings with risk + action     │
│  30-Day Plan      → Prioritized action items            │
│  Predictions      → Trend direction + confidence        │
│  Quality Report   → Data issues + improvement tips      │
└─────────────────────────────────────────────────────────┘
```

### Step 5 — AI Confidence Scoring
A composite score (0–100) is calculated from:
- Data confidence (completeness, row count)
- Metric validity (no errors, meaningful results)

### LLM Fallback Strategy
```python
GROQ_MODELS = [
    "llama-3.1-8b-instant",   # Primary: fastest, most stable
    "mixtral-8x7b-32768",     # Fallback: stronger reasoning
]
```
If the primary model fails or returns invalid JSON, the system automatically retries with the fallback model.

### Chat RAG System
The chat system uses a context snapshot (key metrics + insights) as retrieval context:
1. Question is **classified** (explanation / recommendation / visualization / prediction)
2. **System prompt** is built with document context + conversation history
3. LLM generates a response, optionally including a **chart configuration**
4. Chart configs are rendered live in the frontend using Recharts

---

## 🗄️ Data Models

### `users` collection
```typescript
{
  _id: ObjectId,
  clerkUserId: string,   // Unique Clerk user identifier
  createdAt: Date
}
```

### `documents` collection
```typescript
{
  _id: ObjectId,
  userId: string,            // Clerk user ID
  originalFileName: string,  // Original uploaded filename
  nickname: string,          // User-defined display name
  processedPath: string,     // Path to processed JSON
  contextPath: string,       // Path to context snapshot JSON
  dataConfidence: number,    // 0–100 data quality score
  aiConfidence: number,      // 0–100 AI analysis quality score
  createdAt: Date
}
```

### `chat_sessions` collection
```typescript
{
  _id: ObjectId,
  userId: string,
  documentId: string,
  summary: string,           // Rolling conversation summary
  messages: [
    {
      role: "user" | "assistant",
      content: string,
      chartConfig: object | null,  // Optional Recharts config
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Processed Dataset JSON (stored locally)
```typescript
{
  file_name: string,
  nickname: string,
  data_confidence: number,
  ai_confidence: number,
  metrics: MetricResult[],
  insights: Insight[],
  action_plan_30_days: string[],
  quality_analysis: {
    quality_score: number,
    suggestions: { issue: string, recommendation: string }[]
  },
  predictions: {
    target: string,
    trend: "up" | "down" | "stable",
    reasoning: string,
    confidence: "high" | "medium" | "low"
  }[]
}
```

---

## 🎨 Frontend Pages

| Route | Page | Description |
|:------|:-----|:------------|
| `/` | Landing | Hero, features, pricing, FAQ |
| `/dashboard` | Home | Overview stats and quick actions |
| `/dashboard/upload` | Upload | File upload (CSV/XLSX/Google Sheets) |
| `/dashboard/overview` | Overview | Dataset metrics and confidence scores |
| `/dashboard/insights` | Insights | Strategic insights with risk/action |
| `/dashboard/predictions` | Predictions | Trend forecasts and confidence |
| `/dashboard/ai-assistant` | AI Chat | Neural assistant with chart generation |
| `/dashboard/explorer` | Explorer | Data registry with filter/sort/export |
| `/dashboard/profile` | Profile | User account settings |
| `/dashboard/welcome` | Welcome | Onboarding flow for new users |

---

## 🔐 Security

- **Authentication**: All dashboard routes are protected by [Clerk](https://clerk.com/) — supports OAuth, SSO, and magic links
- **Multi-tenancy**: Every database query is scoped to the authenticated `clerkUserId` — users can never access each other's data
- **Database**: MongoDB Atlas with TLS 1.2+ encryption in transit
- **API Keys**: Stored exclusively in environment variables, never committed to source control
- **File Validation**: Only `.csv` and `.xlsx` extensions are accepted; filenames are sanitized before storage
- **CORS**: Configurable via FastAPI middleware (restrict `allow_origins` in production)

> ⚠️ **Production Note**: Set `allow_origins` in `main.py` to your specific frontend domain instead of `"*"`.

---

## 🚢 Deployment

### Backend (Render / Railway / Fly.io)

1. Set environment variables: `GROQ_API_KEY`, `MONGODB_URI`
2. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Set working directory to `fastapi-backend/`

### Frontend (Vercel / Render)

1. Set environment variables (all `NEXT_PUBLIC_*` and `CLERK_SECRET_KEY`)
2. Set build command: `pnpm build`
3. Set output directory: `.next`
4. Set root directory to `frontend/`

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist your server's IP (or `0.0.0.0/0` for dynamic IPs)
3. Create a database user and copy the connection string to `MONGODB_URI`

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo, then:
git clone https://github.com/your-username/intellexa-ai.git
cd intellexa-ai

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: add your feature description"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

### Development Tips
- Backend auto-reloads with `--reload` flag in uvicorn
- Frontend hot-reloads with `pnpm dev`
- Use `http://localhost:5000/docs` for interactive API testing
- MongoDB collections are auto-created on first use

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

**Built with ❤️ by the Intellexa Team**

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/Groq-f34f29?style=flat-square&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)

</div>
