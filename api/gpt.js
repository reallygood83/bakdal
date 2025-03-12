export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // 환경변수, 입력값이 제대로 들어오는지 확인
  console.log('GEMINI API KEY:', GEMINI_API_KEY);
  console.log('Prompt:', prompt);

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is missing' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ]
      })
    });

    const data = await response.json();

    console.log('Gemini API Response:', data); // 응답 확인

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      res.status(200).json({ answer: data.candidates[0].content.parts[0].text });
    } else {
      res.status(500).json({ error: data.error || 'Gemini 글 생성 실패' });
    }
  } catch (error) {
    console.error('Gemini API 호출 오류:', error);
    res.status(500).json({ error: 'Gemini API 오류 발생' });
  }
}
