# 🧠 Intellexa.ai - AI-Powered Decision Support System

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-009688?style=for-the-badge&logo=render)](https://ai-powered-decision-support.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-1.0-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/LLM-Groq_Llama_3-f34f29?style=for-the-badge)](https://groq.com/)

Intellexa is a high-performance, AI-driven business intelligence platform that transforms raw datasets into actionable strategic insights. By leveraging advanced LLMs and automated data processing, Intellexa provides real-time trend analysis, predictive modeling, and an interactive neural assistant to support critical decision-making.

---

## ✨ Key Features

- **🚀 Neural Data Processing**: Automated extraction of metrics, aggregations, and trends from CSV/XLSX files.
- **🤖 AI Strategy Assistant**: Context-aware chat powered by Llama 3 via Groq, capable of generating interactive charts and strategic advice.
- **📊 Predictive Analytics**: Trajectory modeling and growth forecasting based on historical data patterns.
- **📁 Neural Data Registry**: High-performance data explorer with advanced filtering and sorting for processed metrics.
- **📄 Professional Reporting**: One-click PDF report generation and CSV exports for neural insights.
- **🔐 Secure Architecture**: Multi-tenant authentication via Clerk and encrypted session management.

---

## 🏗️ System Architecture

Intellexa follows a modern decoupled architecture:

### [Frontend (Next.js)](./frontend)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 with Glassmorphism UI
- **Charts**: Recharts for dynamic data visualization
- **State Management**: React Context API
- **Auth**: Clerk for seamless user management

### [Backend (FastAPI)](./fastapi-backend)
- **Framework**: FastAPI (Python 3.10+)
- **Database**: MongoDB with Mongoengine ODM
- **LLM Engine**: Groq SDK (Llama 3.1 models)
- **Processing**: Pandas & NumPy for high-speed data computation
- **Storage**: Local structured storage for raw and processed JSON context

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & pnpm
- Python 3.10+
- MongoDB instance (Local or Atlas)
- Groq API Key
- Clerk API Keys

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/intellexa-ai.git
   cd intellexa-ai
   ```

2. **Backend Setup**
   ```bash
   cd fastapi-backend
   pip install -r requirements.txt
   # Create .env with MONGODB_URI and GROQ_API_KEY
   python main.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   pnpm install
   # Create .env.local with Clerk keys
   pnpm dev
   ```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js 15, Tailwind CSS, Lucide React, Recharts |
| **Backend** | Python, FastAPI, MongoDB, Mongoengine, Pandas |
| **AI/ML** | Groq (Llama 3.1), LangChain (Optional), Custom Neural Engine |
| **DevOps** | Pnpm, PostCSS, ESLint |

---

## 📸 Screenshots

*(Add your screenshots here to make it even more eye-catching!)*

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the Intellexa Team
</p>
