import { demoMessages, type Message } from '@/data/demoConversations';

// BACKEND INTEGRATION POINT: Replace with POST /api/assistant/chat
export async function sendMessage(content: string): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return demoMessages[1];
}

// BACKEND INTEGRATION POINT: Replace with GET /api/assistant/conversations
export async function getConversations() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [];
}