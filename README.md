# 박달초 교사용 수업 도구

교사들을 위한 다양한 수업 지원 도구를 제공하는 웹 애플리케이션입니다.

## 주요 기능

- 수업 칠판: 실시간으로 글을 작성하고 편집할 수 있는 디지털 칠판
- 오늘 날짜 및 시간표: 오늘 날짜와 시간표를 표시
- GPT 글쓰기 도우미: OpenAI API를 활용한 교사 글쓰기 지원 도구
- 시간 관리: 디지털 시계 및 수업 타이머
- 학사일정 및 급식: 학교 학사일정과 급식정보 조회
- 학생 뽑기: 랜덤 학생 선택 도구
- 모둠 편성: 학생들을 모둠으로 자동 편성

## 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/reallygood83/bakdal
cd bakdal
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고 OpenAI API 키 입력:
```bash
cp .env.local.example .env.local
```
그리고 `.env.local` 파일을 열어 OpenAI API 키를 입력합니다.

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 확인
`http://localhost:3000`으로 접속하여 앱을 확인합니다.

## 배포 방법 (Vercel)

1. [Vercel](https://vercel.com/)에 가입하고 GitHub 저장소와 연결합니다.
2. 새 프로젝트 생성 시 이 저장소를 선택합니다.
3. 환경 변수에 `OPENAI_API_KEY`를 추가합니다.
4. 배포 버튼을 클릭하여 배포합니다.

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 제작자

배움의 달인 김문정 