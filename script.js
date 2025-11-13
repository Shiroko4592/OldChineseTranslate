document.getElementById('translateBtn').addEventListener('click', translate);
document.getElementById('speakBtn').addEventListener('click', speak);

// 한국어 → 상고한어 치환
const dictionary = {
  '모든 인간은 태어날 때부터 자유로우며, 그 존엄과 권리에 있어 동등하다. 인간은 천부적으로 이성과 양심을 부여받았으며, 서로 형제애의 정신으로 행동하여야 한다.':
  '凡人生而自由，其尊與權利皆等。人稟天賦理與心，當以兄弟之情相行。'
};

// 상고한어 근사 발음(Karlgren식) 사전
const pronunciation = {
  '凡人生而自由，其尊與權利皆等。人稟天賦理與心，當以兄弟之情相行。': 
  'bam nyin sreng ne tsi lu. khi tsun lak gwen ri kray tang nyin prum khin pha ri lam sum. tang i khrang lek te sleng sang krang.'
};


function translate() {
  const korean = document.getElementById('korean').value.trim();
  if (!korean) {
    alert('한국어 입력해줘');
    return;
  }

  let oldChinese = korean;
  for (let key in dictionary) {
    const regex = new RegExp(key, 'g');
    oldChinese = oldChinese.replace(regex, dictionary[key]);
  }

  document.getElementById('output').textContent = oldChinese;
}

function speak() {
  const output = document.getElementById('output').textContent;
  if (!output) {
    alert('먼저 번역해줘');
    return;
  }

  const pronText = pronunciation[output] || output;

  const utter = new SpeechSynthesisUtterance(pronText);
  utter.lang = 'en-US';
  utter.rate = 0.9; // 살짝 느리게
  speechSynthesis.speak(utter);
}
