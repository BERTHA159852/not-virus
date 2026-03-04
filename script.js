let selectedRoute = 'vi'; // vi = hiểu, en = không hiểu

const startBtn = document.getElementById('start-btn');
const langBtn = document.getElementById('lang-btn');
const f11Hint = document.getElementById('f11-hint');

// đổi route (chỉ ở start screen)
langBtn.addEventListener('click', () => {
  selectedRoute = selectedRoute === 'vi' ? 'en' : 'vi';

  // đổi text UI (KHÔNG phải dịch story)
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

// bấm start → khóa route + animation
startBtn.addEventListener('click', () => {

  // khóa route để dùng cho story sau
  localStorage.setItem('storyRoute', selectedRoute);

  // animation bay lên
  startBtn.classList.add('fly-up');

  setTimeout(() => {
    langBtn.classList.add('fly-up');
    f11Hint.classList.add('hide');
  }, 400);

  setTimeout(() => {
    document.getElementById('start-screen').style.display = 'none';

    // 👉 từ đây load story theo route
    // loadScene('intro');
  }, 1200);
});


  requestAnimationFrame(animate);
}

animate();
