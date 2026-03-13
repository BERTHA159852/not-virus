let selectedRoute = 'vi';
let isStarting = false;
let flag01 = 0;
let flag02 = 0;

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');
const f11Hint = document.getElementById('f11-hint');
const codeWrapper = document.getElementById('code-input-wrapper');
const accessInput = document.getElementById('access-code');
const confirmBtn = document.getElementById('confirm-code');

langBtn.addEventListener('click', () => {
    if (isStarting) return;
    if (selectedRoute === 'vi' && flag01 === 0 && flag02 === 0) {
        flag01 = 1;
        codeWrapper.classList.add('show'); 
        accessInput.focus();
    } else if (selectedRoute === 'vi' &&  flag01 === 1)
    {
        flag01 = 0;
        codeWrapper.classList.remove('show');
    } else if (selectedRoute === 'vi' && flag01 === 0 && flag02 === 1){
        selectedRoute = 'en';
        updateContent('en');
    } else if (selectedRoute === 'en'){        
        selectedRoute = 'vi';
        updateContent('vi');
        codeWrapper.classList.remove('show');
    }
});
 accessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        confirmBtn.click();
    }
});
confirmBtn.addEventListener('click', () => {
    const secretCode = "xxLyraxx"; 
    const userValue = accessInput.value.trim();
    
    if (userValue === secretCode) {
        selectedRoute = 'en';
        updateContent('en');
        codeWrapper.classList.remove('show');
        flag02 = 1;
        
        langBtn.style.color = "#2ecc71";
        setTimeout(() => { langBtn.style.color = "black"; }, 5);
    } else {
        accessInput.classList.add('error-shake');
        accessInput.value = "";
        accessInput.placeholder = "WRONG CODE";
        
        setTimeout(() => {
            accessInput.classList.remove('error-shake');
            accessInput.placeholder = "ENTER CODE TO CHANGE";
        }, 500);
    }
});

function updateContent(lang) {
    if (lang === 'vi') {
        startBtn.textContent = 'BẮT ĐẦU';
        langBtn.textContent = 'Ngôn ngữ: VI';
        f11Hint.textContent = 'Nhấn F11 để có trải nghiệm tốt hơn';
    } else {
        startBtn.textContent = 'START';
        langBtn.textContent = 'Language: EN';
        f11Hint.textContent = 'Press F11 for better experience';
    }
}

startBtn.addEventListener('click', () => {
  if (isStarting) return;
  isStarting = true;
  codeWrapper.classList.remove('show');
    f11Hint.classList.add('hide');
  
  localStorage.setItem('storyRoute', selectedRoute);
  startBtn.classList.add('fly-up');

  setTimeout(() => {
    langBtn.classList.add('fly-up');
  }, 400);

  setTimeout(() => {

    document.getElementById('start-screen').style.display = 'none';

    const canvas = document.getElementById("intro-canvas");
    canvas.style.display = "block";

    startIntro(); // bắt đầu vẽ

  }, 2200);

});
