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


const canvas = document.getElementById('intro');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class LineSegment {
  constructor(x1, y1, x2, y2, speed = 0.01) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.progress = 0;
    this.speed = speed;
  }

  draw(ctx) {
    const cx = (this.x1 + this.x2) / 2;
    const cy = (this.y1 + this.y2) / 2;

    const dx = (this.x2 - this.x1) / 2;
    const dy = (this.y2 - this.y1) / 2;

    const px = dx * this.progress;
    const py = dy * this.progress;

    ctx.beginPath();
    ctx.moveTo(cx - px, cy - py);
    ctx.lineTo(cx + px, cy + py);
    ctx.stroke();
  }

  update() {
    if (this.progress < 1) {
      this.progress += this.speed;
    }
  }
}

const lines = [];

// tường ngoài
lines.push(new LineSegment(100, 100, 800, 100));
lines.push(new LineSegment(100, 400, 800, 400));
lines.push(new LineSegment(100, 100, 100, 400));
lines.push(new LineSegment(800, 100, 800, 400));

// cửa
lines.push(new LineSegment(420, 200, 480, 200));
lines.push(new LineSegment(420, 350, 480, 350));
lines.push(new LineSegment(420, 200, 420, 350));
lines.push(new LineSegment(480, 200, 480, 350));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';

  lines.forEach(line => {
    line.update();
    line.draw(ctx);
  });

  requestAnimationFrame(animate);
}

animate();

function splitLine(x1, y1, x2, y2, parts) {
  const segments = [];
  for (let i = 0; i < parts; i++) {
    const t1 = i / parts;
    const t2 = (i + 1) / parts;

    segments.push(
      new LineSegment(
        x1 + (x2 - x1) * t1,
        y1 + (y2 - y1) * t1,
        x1 + (x2 - x1) * t2,
        y1 + (y2 - y1) * t2,
        0.02
      )
    );
  }
  return segments;
}

lines.push(...splitLine(100, 100, 800, 100, 3));

const door = {
  x: 420,
  y: 200,
  w: 60,
  h: 150
};

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (
    x > door.x &&
    x < door.x + door.w &&
    y > door.y &&
    y < door.y + door.h
  ) {
    startTransition();
  }
});

function startTransition() {
  canvas.style.transition = 'opacity 1s';
  canvas.style.opacity = 0;

  setTimeout(() => {
    // load scene tiếp theo
    // window.location = 'scene1.html';
    // hoặc đổi state game
  }, 1000);
}
