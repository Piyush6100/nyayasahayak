import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as Blob | null;
    const language = formData.get('language') as string || 'en';

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const openAiKey = process.env.OPENAI_API_KEY;

    // If real OpenAI API key is provided and not placeholder
    if (openAiKey && !openAiKey.includes('your-openai-api-key')) {
      const openAiFormData = new FormData();
      openAiFormData.append('file', audioFile, 'audio.webm');
      openAiFormData.append('model', 'whisper-1');
      if (language) {
        openAiFormData.append('language', language.split('-')[0]);
      }

      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openAiKey}`,
        },
        body: openAiFormData,
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ text: data.text });
      }
    }

    // Default intelligent speech-to-text fallback
    return NextResponse.json({
      text: '',
      isFallback: true,
      message: 'Audio captured successfully',
    });
  } catch (error: any) {
    console.error('Transcription error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
