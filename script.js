let selectedRoute = 'vi';
let isStarting = false;

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');
const f11Hint = document.getElementById('f11-hint');

langBtn.addEventListener('click', () => {
  if (isStarting) return;
  selectedRoute = selectedRoute === 'vi' ? 'en' : 'vi';

  if (selectedRoute === 'vi') {
    startBtn.textContent = 'BẮT ĐẦU';
    langBtn.textContent = 'VI';
    f11Hint.textContent = 'Nhấn F11 để có trải nghiệm tốt hơn';
  } else {
    startBtn.textContent = 'START';
    langBtn.textContent = 'EN';
    f11Hint.textContent = 'Press F11 for better experience';
  }
});

startBtn.addEventListener('click', () => {
  if (isStarting) return;
  isStarting = true;
  
  localStorage.setItem('storyRoute', selectedRoute);
  startBtn.classList.add('fly-up');

  setTimeout(() => {
    langBtn.classList.add('fly-up');
    f11Hint.classList.add('hide');
  }, 400);

  setTimeout(() => {

    document.getElementById('start-screen').style.display = 'none';

    const canvas = document.getElementById("intro-canvas");
    canvas.style.display = "block";

    startIntro(); // bắt đầu vẽ

  }, 2200);

});
