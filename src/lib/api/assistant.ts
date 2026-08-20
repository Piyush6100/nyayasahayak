import { demoMessages, type Message } from '@/data/demoConversations';

// BACKEND INTEGRATION POINT: Connected to FastAPI backend
export async function sendMessage(content: string): Promise<Message> {
  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: content }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from AI backend');
    }

    const data = await response.json();
    
    return {
      id: `msg-ai-${Date.now()}`,
      role: 'assistant',
      content: data.answer,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return {
      id: `msg-err-${Date.now()}`,
      role: 'assistant',
      content: "I'm sorry, I'm currently unable to connect to the legal AI model. Please ensure the backend server is running.",
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
  }
}

// BACKEND INTEGRATION POINT: Replace with GET /api/assistant/conversations
export async function getConversations() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [];
}