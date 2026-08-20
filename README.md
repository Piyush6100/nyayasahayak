# Indian Legal AI Assistant

This is a complete, modern web application that provides legal information using the **Ananya8154/Gemma-2-2B-Indian-Law** AI model. The system strictly utilizes Hugging Face Transformers and runs on a FastAPI backend, paired with a React and Vite frontend.

## ⚠️ Disclaimer
This AI assistant provides general legal information for educational purposes only and is not a substitute for professional legal advice. Always consult a qualified legal professional for advice concerning your specific situation.

---

## 1. Features
- **Accurate Legal Q&A**: Asks the `Gemma-2-2B-Indian-Law` model for context-aware responses.
- **FastAPI Backend**: A highly performant API wrapper around the Hugging Face model.
- **Single Model Load**: The model is loaded exactly once into memory when the server starts to prevent latency.
- **Hardware Agnostic**: Automatically detects and uses `cuda` if available; otherwise falls back to `cpu`.
- **Modern React UI**: Chat interface built with Vite and Tailwind CSS.
- **RAG Ready**: The architecture is set up to easily integrate PDF processing and Retrieval-Augmented Generation in the future.

---

## 2. Architecture & Technologies

### Backend
- **Python 3.10+**
- **Hugging Face Transformers** & **PyTorch**: For loading and querying the model.
- **FastAPI** & **Uvicorn**: For exposing the REST API.

### Frontend
- **React** & **Vite**: For the user interface and fast builds.
- **Tailwind CSS**: For sleek, modern styling.
- **react-markdown**: For rendering the AI's markdown-formatted responses.

---

## 3. Installation & Setup

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher

### Step 1: Backend Setup
1. Open a terminal and navigate to the project root.
2. Go to the backend directory:
   ```bash
   cd backend
   ```
3. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On Mac/Linux: `source venv/bin/activate`
5. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Set up your environment variables (optional for now):
   ```bash
   cp .env.example .env
   ```

### Step 2: Start the Backend (and Download Model)
Start the FastAPI server using Uvicorn:
```bash
python app.py
```
*Note: The first time you run this, it will automatically download the **Ananya8154/Gemma-2-2B-Indian-Law** model from Hugging Face. This may take a few minutes depending on your internet connection.*

### Step 3: Frontend Setup
1. Open a *new* terminal window.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the NPM dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL provided (usually `http://localhost:5173`).

---

## 4. How the AI Model Works

### Loading the Model
The model loading logic is encapsulated in `backend/model.py`. We use:
- **`AutoTokenizer`**: Converts the human-readable text into a mathematical representation (tokens) that the model understands.
- **`AutoModelForCausalLM`**: Loads the core model weights designed specifically for text generation (Causal Language Modeling).

### Generating Answers
When a user asks a question, `model.generate()` is called with carefully tuned parameters:
- `max_new_tokens=256`: Limits the response length.
- `temperature=0.3`: Keeps the output factual and deterministic (important for law).
- `repetition_penalty=1.1`: Prevents the model from repeating itself.

---

## 5. API Documentation

### `POST /api/chat`
Sends a question to the AI model and returns the generated answer.

**Request Body:**
```json
{
  "question": "What is Article 21?"
}
```

**Response Body:**
```json
{
  "answer": "Article 21 of the Constitution of India provides..."
}
```

---

## 6. Testing Instructions
To verify the system works correctly, try asking the following questions in the Chat UI:
1. "What is Article 21 of the Constitution of India?"
2. "What is the purpose of the Indian Contract Act?"
3. "When did the North-Eastern Areas (Reorganisation) Act, 1971 come into effect?"
4. "What are Fundamental Rights?"
5. "What is the difference between a civil and criminal case?"

### Troubleshooting
- **Model not downloading:** Ensure your firewall isn't blocking Hugging Face, or check your internet connection.
- **Out of Memory (OOM):** If you run out of RAM/VRAM, close other applications. The 2B parameter model requires roughly 4-6GB of memory to load.
- **Frontend can't connect to backend:** Ensure the backend is running on `http://localhost:8000`. Check the browser's console for CORS errors.

---

## 7. Future RAG Implementation Plan
The next phase of this project will introduce Retrieval-Augmented Generation (RAG) to allow the AI to answer questions based on specific PDF documents uploaded by the user:

1. **Document Ingestion Module:** Use `pdfplumber` or `PyPDF2` to extract text from user-uploaded legal PDFs.
2. **Text Chunking:** Split the text into semantic chunks of ~500 tokens using `langchain`.
3. **Embeddings & Vector Database:** Generate embeddings using a lightweight local model (`all-MiniLM-L6-v2`) and store them in a local ChromaDB instance.
4. **Retrieval Flow:** When a user asks a question, query the vector DB for the top 3 most relevant chunks and inject them into the prompt's `### Context:` section (already supported in `backend/utils/prompt.py`).