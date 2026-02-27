let language = 'VI';

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');

// Đổi ngôn ngữ
langBtn.addEventListener('click', () => {
  language = language === 'VI' ? 'EN' : 'VI';
  langBtn.textContent = language;

  startBtn.textContent = language === 'VI' ? 'BẮT ĐẦU' : 'START';
});

// Bấm bắt đầu → animation
startBtn.addEventListener('click', () => {
  startBtn.classList.add('fly-up');

  setTimeout(() => {
    langBtn.classList.add('fly-up');
  }, 400);

  setTimeout(() => {
    document.getElementById('start-screen').style.display = 'none';
    // 👉 Tại đây bạn chuyển sang màn hình game
    // showScreen('screen-1');
  }, 1200);
});
