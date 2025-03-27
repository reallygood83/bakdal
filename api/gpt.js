// OpenAI API를 사용하는 서버리스 함수
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메서드입니다.' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: '프롬프트가 비어있습니다.' });
    }

    // OpenAI API 설정
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // OpenAI API 호출
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "당신은 한국의 초등학교 교사들을 위한 글쓰기 도우미입니다. 교육적이고 명확하며 적절한 내용을 생성해 주세요." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // 응답 처리
    const answer = completion.data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
} 