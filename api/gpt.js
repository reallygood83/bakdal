// api/gpt.js (Gemini API용으로 수정됨)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // 환경변수에서 Gemini API 키를 가져옵니다.

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

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
