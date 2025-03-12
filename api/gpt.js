// api/gpt.js
export default async function handler(req, res) {
  // POST 요청이 아니면 거부
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  
  const { prompt, max_tokens, temperature, model } = req.body;

  try {
    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // API 키는 환경변수로 관리 (process.env.OPENAI_API_KEY)
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",  // 기본값 설정, 필요에 따라 수정
        prompt: prompt,
        max_tokens: max_tokens || 200,
        temperature: temperature || 0.7,
        n: 1,
        stop: null
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0].text) {
      res.status(200).json({ answer: data.choices[0].text });
    } else {
      res.status(500).json({ error: '글 생성에 실패했습니다.' });
    }
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    res.status(500).json({ error: '글 생성에 오류가 발생했습니다.' });
  }
}
