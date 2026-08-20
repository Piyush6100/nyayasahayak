from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from model import model_manager
from utils.prompt import get_legal_prompt

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    print("Starting backend and loading model...")
    try:
        model_manager.load_model()
    except Exception as e:
        print(f"Error loading model: {e}")
        # We don't raise here to avoid crashing the whole API, but queries will fail
    yield
    # Clean up on shutdown
    print("Shutting down backend...")

app = FastAPI(
    title="Indian Legal AI Assistant",
    description="API for the Gemma-2-2B-Indian-Law model",
    version="1.0.0",
    lifespan=lifespan
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=1000)

class ChatResponse(BaseModel):
    answer: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not model_manager.is_loaded:
        raise HTTPException(status_code=503, detail="Model is not loaded or is currently loading.")
    
    try:
        # Generate prompt
        prompt = get_legal_prompt(request.question)
        
        # Get answer from model
        answer = model_manager.generate_answer(prompt)
        
        return ChatResponse(answer=answer)
    except Exception as e:
        print(f"Generation error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the response.")

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "model_loaded": model_manager.is_loaded,
        "device": model_manager.device
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)
