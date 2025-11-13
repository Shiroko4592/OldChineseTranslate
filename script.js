document.getElementById('translateBtn').addEventListener('click', translate);
document.getElementById('speakBtn').addEventListener('click', speak);

function translate() {
  const korean = document.getElementById('korean').value;
  
  // 실제 상고한어 번역 로직/모델 연결 필요
  // 현재는 예시 치환
  let oldChinese = korean
    .replace(/인간/g, '人')
    .replace(/자유/g, '自由')
    .replace(/권리/g, '權利');

  document.getElementById('output').textContent = oldChinese;
}

function speak() {
  const output = document.getElementById('output').textContent;
  if (!output) return;

  const utter = new SpeechSynthesisUtterance(output);
  utter.lang = 'zh-CN'; // 상고한어는 없지만, 중국어 발음 대체
  speechSynthesis.speak(utter);
}
