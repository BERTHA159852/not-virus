function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

function isMobileUA() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isFakeDesktopMode() {
  // Mobile + bật chế độ desktop thường có:
  // - touch
  // - viewport rộng bất thường
  return isTouchDevice() && window.innerWidth > 900;
}

const mobileBlock = document.getElementById('mobile-block');
const mobileText = document.getElementById('mobile-text');
const startScreen = document.getElementById('start-screen');

// THỨ TỰ ƯU TIÊN RÕ RÀNG
if (isMobileUA() && !isFakeDesktopMode()) {
  // Mobile bình thường
  mobileText.textContent = 'Vui lòng trải nghiệm trên PC / Laptop';
  mobileBlock.style.display = 'flex';
  startScreen.style.display = 'none';

} else if (isFakeDesktopMode()) {
  // Mobile bật chế độ desktop
  mobileText.textContent =
    'Đã bảo là trải nghiệm trên PC / Laptop thật rồi, đừng cố 😑';
  mobileBlock.style.display = 'flex';
  startScreen.style.display = 'none';
}



let selectedLang = 'vi';

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');
const f11Hint = document.getElementById('f11-hint');

// cập nhật text ban đầu
function updateStartScreen() {
  if (selectedLang === 'vi') {
    startBtn.textContent = 'BẮT ĐẦU';
    langBtn.textContent = 'VI';
    f11Hint.textContent = 'Nhấn F11 để có trải nghiệm tốt hơn';
  } else {
    startBtn.textContent = 'START';
    langBtn.textContent = 'EN';
    f11Hint.textContent = 'Press F11 for better experience';
  }
}

// đổi ngôn ngữ (CHỈ Ở MÀN START)
langBtn.addEventListener('click', () => {
  selectedLang = selectedLang === 'vi' ? 'en' : 'vi';
  updateStartScreen();
});

// bấm bắt đầu → KHÓA NHÁNH
startBtn.addEventListener('click', () => {
  localStorage.setItem('storyLang', selectedLang);

  // animation bay lên
  startBtn.classList.add('fly-up');
  setTimeout(() => langBtn.classList.add('fly-up'), 400);
  setTimeout(() => {
    document.getElementById('start-screen').style.display = 'none';
    startStory();
  }, 1200);
});

// khởi động câu chuyện
async function startStory() {
  const lang = localStorage.getItem('storyLang');
  const res = await fetch(`story/${lang}/intro.json`);
  const scene = await res.json();

  console.log('SCENE LOADED:', scene);
  // ở đây bạn render nội dung game
}

// init
updateStartScreen();
