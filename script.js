// script.js
document.getElementById('translateBtn').addEventListener('click', translate);
document.getElementById('speakBtn').addEventListener('click', speak);

async function translate() {
  const korean = document.getElementById('korean').value.trim();
  if (!korean) {
    alert('한국어 입력해줘');
    return;
  }

  // 번역 요청 시작
  try {
    // 예: 가상의 API 엔드포인트와 키
    const apiUrl = 'https://your‑ancient‑chinese‑api.example.com/translate';
    const apiKey = 'YOUR_API_KEY_HERE';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        source_language: 'ko',
        target_language: 'ancient_chinese',
        text: korean
      })
    });

    if (!response.ok) {
      throw new Error(`번역 API 오류: ${response.status}`);
    }

    const result = await response.json();
    // API 응답 형식 가정: { translated_text: "...", pronunciation: "..." }
    const oldChinese = result.translated_text;
    const pronunciation = result.pronunciation;  // 발음 정보가 있다면

    document.getElementById('output').textContent = oldChinese;

    // 발음 정보가 있다면 저장해두기
    document.getElementById('output').dataset.pronunciation = pronunciation || '';

  } catch (err) {
    console.error(err);
    alert('번역 중 오류가 생겼어. 콘솔 확인해줘.');
  }
}

function speak() {
  const outputElem = document.getElementById('output');
  const text = outputElem.textContent;
  if (!text) {
    alert('먼저 번역해줘');
    return;
  }

  // 발음 정보가 있다면 우선 사용하고, 없다면 일반 TTS로
  const pronunciation = outputElem.dataset.pronunciation;
  const utter = new SpeechSynthesisUtterance(pronunciation || text);
  // 상고한어에 해당하는 언어 코드가 없기 때문에 중국어(표준)로 대체
  utter.lang = 'zh-CN';
  speechSynthesis.speak(utter);
}
