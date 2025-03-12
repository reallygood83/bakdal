export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error('❌ Method Not Allowed');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // 환경변수와 입력값이 제대로 전달되는지 로그로 확인
  console.log('✅ GEMINI_API_KEY:', GEMINI_API_KEY ? '설정됨' : '설정되지 않음');
  console.log('✅ Prompt:', prompt || '입력값 없음');

  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다.');
    return res.status(500).json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' });
  }

  if (!prompt) {
    console.error('❌ Prompt가 전달되지 않았습니다.');
    return res.status(400).json({ error: 'Prompt가 필요합니다.' });
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

    // 응답 상태 코드 로그
    console.log('✅ Gemini API Status:', response.status);

    const data = await response.json();

    console.log('✅ Gemini API 응답:', data);

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return res.status(200).json({ answer: data.candidates[0].content.parts[0].text });
    } else {
      console.error('❌ Gemini API에서 유효한 답변을 받지 못했습니다.', data);
      return res.status(500).json({ error: data.error || 'Gemini 글 생성 실패' });
    }
  } catch (error) {
    console.error('❌ Gemini API 호출 오류:', error.message || error);
    return res.status(500).json({ error: 'Gemini API 호출 중 오류 발생' });
  }
}
