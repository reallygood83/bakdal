import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>박달초 교사용 수업 도구</title>
        <link rel="stylesheet" href="/bakdal/style.css" />
      </Head>

      <Script src="/bakdal/script.js" strategy="afterInteractive" />

      <div className="app-container">
        <header>
          <h1 className="page-title">박달초 교사용 수업 도구</h1>
          <p>❤️오늘 하루 평안하세요❤️</p>
        </header>

        {/* 전체 섹션을 감싸는 컨테이너 (드래그앤드롭용) */}
        <div id="sectionsContainer">
          {/* 1. 칠판 */}
          <div className="section" draggable="true">
            <div className="section-header">
              <span>수업 칠판</span>
              <button className="toggle-btn" aria-label="toggle">접기/펼치기</button>
            </div>
            <div className="section-content">
              <div className="chalkboard-container">
                <div className="text-tools">
                  <button id="boldBtn" title="굵게"><strong>B</strong></button>
                  <button id="italicBtn" title="기울임"><em>I</em></button>
                  <button id="underlineBtn" title="밑줄"><u>U</u></button>
                  <div className="divider"></div>
                  
                  {/* 글자 크기: 작게(16px), 보통(18px), 크게(24px), 매우 크게(32px) */}
                  <select id="fontSizeSelector" title="글자 크기">
                    <option value="16px">작게</option>
                    <option value="18px" selected>보통</option>
                    <option value="24px">크게</option>
                    <option value="32px">매우 크게</option>
                  </select>
                  
                  {/* 텍스트 색깔에 검정색 추가 */}
                  <select id="textColorSelector" title="글자 색상">
                    <option value="white">흰색</option>
                    <option value="black">검정색</option>
                    <option value="yellow">노란색</option>
                    <option value="lightblue">하늘색</option>
                    <option value="pink">분홍색</option>
                    <option value="#ffcc00">주황색</option>
                    <option value="#90ee90">연두색</option>
                  </select>
                  
                  <button id="highlightBtn" title="강조표시">형광펜</button>
                  <div className="divider"></div>
                  
                  {/* 전체 지우기 */}
                  <button id="clearBtn" title="지우기">전체 지우기</button>
                  <button id="copyBtn" title="복사">복사</button>
                  <div className="divider"></div>
                  <button id="youtubeEmbedBtn" title="유튜브 삽입">유튜브</button>
                </div>
                <div className="chalkboard">
                  <div className="editor-container">
                    <div id="chalkboardEditor" contentEditable="true" spellCheck="false"
                         placeholder="여기에 수업 내용을 적으세요...">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 오늘 날짜 & 시간표 */}
          <div className="section" draggable="true">
            <div className="section-header">
              <span>오늘 날짜 및 시간표</span>
              <button className="toggle-btn" aria-label="toggle">접기/펼치기</button>
            </div>
            <div className="section-content">
              <div className="date-timetable-section">
                <div className="date-timetable">
                  <strong>오늘 날짜:</strong> <span id="todayInfo"></span>
                </div>
                <div className="timetable-container">
                  <table className="timetable">
                    <thead>
                      <tr>
                        <th>1교시</th>
                        <th>2교시</th>
                        <th>3교시</th>
                        <th>4교시</th>
                        <th>5교시</th>
                        <th>6교시</th>
                        <th>7교시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {[...Array(7)].map((_, i) => (
                          <td key={i}>
                            <select className="subjectSelector">
                              <option>국어</option>
                              <option>수학</option>
                              <option>사회</option>
                              <option>과학</option>
                              <option>영어</option>
                              <option>음악</option>
                              <option>미술</option>
                              <option>체육</option>
                              <option>실과</option>
                              <option>도덕</option>
                              <option>윤리</option>
                              <option>역사</option>
                              <option>가정</option>
                              <option>기술</option>
                              <option>입력</option>
                            </select>
                            <input type="text" className="customSubject" style={{display: 'none'}} placeholder="직접 입력"/>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 