from model import model_manager
from utils.prompt import get_legal_prompt

def test_model():
    print("Initializing model... (This will download the model if it's the first time)")
    model_manager.load_model()
    
    test_question = "What is Article 21 of the Constitution of India?"
    print(f"\nTest Question: {test_question}")
    
    prompt = get_legal_prompt(test_question)
    
    print("\nGenerating response...\n")
    try:
        answer = model_manager.generate_answer(prompt)
        print("=== AI Answer ===")
        print(answer)
        print("=================")
    except Exception as e:
        print(f"Error generating answer: {e}")

if __name__ == "__main__":
    test_model()
