import { demoRTIApplication } from '@/data/demoRTI';

// BACKEND INTEGRATION POINT: Replace with POST /api/rti/generate
export async function generateRTI(formData: Record<string, string>) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { ...demoRTIApplication, ...formData };
}

// BACKEND INTEGRATION POINT: Replace with GET /api/rti/draft/:id
export async function getDraft(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return demoRTIApplication;
}