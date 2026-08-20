def get_legal_prompt(user_question: str, context: str = None) -> str:
    """
    Generates a structured prompt for the Indian Legal AI model.
    """
    if context:
        prompt = f"""
You are an AI assistant specialized in Indian law. Provide a direct, concise, and accurate answer based on the context provided.
If the answer is not in the context, use your knowledge of Indian law. Mention the relevant Act, Article, Section, or legal provision when appropriate.
Do not repeat the question. Do not generate a new question. Do not hallucinate citations. Do not claim to be a lawyer.

### Context:
{context}

### Question:
{user_question}

### Answer:
"""
    else:
        prompt = f"""
You are an AI assistant specialized in Indian law. Provide a direct, concise, and accurate answer based on your knowledge of Indian law.
Mention the relevant Act, Article, Section, or legal provision when appropriate.
Do not repeat the question. Do not generate a new question. Do not hallucinate citations.
If you do not have enough information to answer accurately, clearly state that.
Do not claim to be a lawyer.

### Question:
{user_question}

### Answer:
"""
    return prompt.strip() + "\n"
