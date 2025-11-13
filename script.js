document.getElementById('translateBtn').addEventListener('click', translate);
document.getElementById('speakBtn').addEventListener('click', speak);

// 한국어 → 상고한어 치환
const dictionary = {
  '인간': '人',
  '자유': '自由',
  '권리': '權利',
  '태어나다': '生',
  '동등하다': '等',
  '이성': '理',
  '양심': '心',
  '형제애': '兄弟之情',
  '행동하다': '行'
};

// 상고한어 근사 발음(Karlgren식) 사전
const pronunciation = {
  '人': 'nǝn',           // rén 대신 상고한어식 근사
  '自由': 'tsɨʔ-juw',
  '權利': 'kwɛn-liʔ',
  '生': 'sŋ̍',
  '等': 'tŋ̍',
  '理': 'liʔ',
  '心': 'sim',
  '兄弟之情': 'hjɨŋ-tɨ tsɨ tsʰjæŋ',
  '行': 'hɑŋ'
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

  let pronText = '';
  for (let char of output) {
    pronText += pronunciation[char] ? pronunciation[char] + ' ' : char;
  }

  const utter = new SpeechSynthesisUtterance(pronText);
  utter.lang = 'zh-CN'; // 브라우저 TTS는 현대 중국어로 읽지만 발음 문자열은 상고한어 근사
  speechSynthesis.speak(utter);
}
