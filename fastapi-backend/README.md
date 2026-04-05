# ⚙️ Intellexa Neural Backend

[![FastAPI](https://img.shields.io/badge/FastAPI-1.0-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

The neural backend of **Intellexa.ai** is a high-speed **FastAPI** service that manages data ingestion, neural processing, and AI-driven intelligence generation.

---

## ⚡ Core Capabilities

- **🧠 Neural Engine**: Automated extraction of metrics and strategic insights using **Groq** (Llama 3.1).
- **📥 High-Speed Ingestion**: Optimized processing for CSV and XLSX datasets with **Pandas**.
- **📊 Predictive Modeling**: Trajectory analysis and growth forecasting engines.
- **💬 Neural Chat**: Context-aware RAG-based (Retrieval Augmented Generation) interaction with datasets.
- **💾 Structured Registry**: Persistence of raw data snapshots and processed neural contexts.

---

## 🏗️ Architecture & Modules

### `engine/` - The Core Intelligence Layer
- **`ai/`**: Strategic generators (Action Plans, Insights, Confidence scores).
- **`chat/`**: Classifier and prompt builders for the neural assistant.
- **`context/`**: Snapshot generators for building the AI's data awareness.
- **`db/`**: MongoDB models and database operations via **Mongoengine**.
- **`llm/`**: Groq SDK integration with automatic model fallback.
- **`routes/`**: FastAPI endpoint controllers (Chat, Documents, Users).
- **`storage/`**: Local persistence management for raw and processed JSONs.
- **`utils/`**: Specialized calculators and spreadsheet converters.

---

## 🛠️ Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Data Handling**: [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoengine](http://mongoengine.org/)
- **AI/LLM**: [Groq](https://groq.com/) API (Llama 3.1 8B/70B)
- **Environment**: [Dotenv](https://pypi.org/project/python-dotenv/) for configuration

---

## 🚀 Deployment & Usage

1. **Install Python Requirements**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   Create a `.env` file in the root of the backend folder:
   ```env
   MONGODB_URI=mongodb+srv://...
   GROQ_API_KEY=gsk_...
   ```

3. **Launch the Engine**
   ```bash
   python main.py
   ```
   *The API will be available at `http://localhost:8000` with interactive docs at `/docs`.*

---

<p align="center">
  Built with ❤️ for Neural Intelligence
</p>
