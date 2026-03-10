let selectedRoute = 'vi';
let isStarting = false;

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');
const f11Hint = document.getElementById('f11-hint');
const codeWrapper = document.getElementById('code-input-wrapper');
const accessInput = document.getElementById('access-code');
const confirmBtn = document.getElementById('confirm-code');

langBtn.addEventListener('click', () => {
    if (isStarting) return;
    if (selectedRoute === 'vi') {
        codeWrapper.classList.add('show'); 
        accessInput.focus(); // Tự động đưa con trỏ vào ô nhập
    } else {
        selectedRoute = 'vi';
        updateContent('vi');
        codeWrapper.classList.remove('show');
    }
});

confirmBtn.addEventListener('click', () => {
    const secretCode = "BIRTHDAY2026"; // Mã bạn giấu ở món quà ngoài đời
    const userValue = accessInput.value.trim().toUpperCase();

    if (userValue === secretCode) {
        // GIẢI MÃ THÀNH CÔNG
        selectedRoute = 'en';
        updateContent('en');
        codeWrapper.classList.remove('show'); // Ẩn ô nhập đi
        
        // Hiệu ứng thông báo nhỏ cho ngầu
        langBtn.style.color = "#2ecc71"; // Đổi màu xanh lá báo thành công
        setTimeout(() => { langBtn.style.color = "black"; }, 2000);
    } else {
        // SAI MÃ: Tạo hiệu ứng rung (Shake) báo lỗi
        accessInput.classList.add('error-shake');
        accessInput.value = "";
        accessInput.placeholder = "WRONG CODE";
        
        setTimeout(() => {
            accessInput.classList.remove('error-shake');
            accessInput.placeholder = "ENTER ACCESS CODE...";
        }, 500);
    }
});

function updateContent(lang) {
    if (lang === 'vi') {
        startBtn.textContent = 'BẮT ĐẦU';
        langBtn.textContent = 'VI';
        f11Hint.textContent = 'Nhấn F11 để có trải nghiệm tốt hơn';
    } else {
        startBtn.textContent = 'START';
        langBtn.textContent = 'EN';
        f11Hint.textContent = 'Press F11 for better experience';
    }
}

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
