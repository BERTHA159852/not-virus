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


/* =========================
   INTRO CANVAS – FULL FILE
   ========================= */

const canvas = document.getElementById('intro');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* =========================
   LINE SEGMENT (vẽ từ tâm)
   ========================= */
class LineSegment {
  constructor(x1, y1, x2, y2, speed = 0.02, delay = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.speed = speed;
    this.delay = delay;
    this.progress = 0;
    this.started = false;
  }

  update(frame) {
    if (frame < this.delay) return;
    this.started = true;
    if (this.progress < 1) {
      this.progress += this.speed;
    }
  }

  draw(ctx) {
    if (!this.started) return;

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
}

/* =========================
   SPLIT LINE HELPER
   ========================= */
function splitLine(x1, y1, x2, y2, parts, speed, delay) {
  const segs = [];
  for (let i = 0; i < parts; i++) {
    const t1 = i / parts;
    const t2 = (i + 1) / parts;
    segs.push(
      new LineSegment(
        x1 + (x2 - x1) * t1,
        y1 + (y2 - y1) * t1,
        x1 + (x2 - x1) * t2,
        y1 + (y2 - y1) * t2,
        speed,
        delay
      )
    );
  }
  return segs;
}

/* =========================
   SCENE SETUP
   ========================= */
const lines = [];
let frame = 0;

// layout tương đối theo màn hình
const cx = canvas.width / 2;
const cy = canvas.height / 2;

const wallW = 700;
const wallH = 300;

const left = cx - wallW / 2;
const right = cx + wallW / 2;
const top = cy - wallH / 2;
const bottom = cy + wallH / 2;

// cửa
const doorW = 80;
const doorH = 160;
const doorX = cx - doorW / 2;
const doorY = bottom - doorH;

/* =========================
   1️⃣ TƯỜNG (vẽ trước)
   ========================= */
lines.push(...splitLine(left, top, right, top, 3, 0.015, 0));
lines.push(...splitLine(left, bottom, right, bottom, 3, 0.015, 0));
lines.push(...splitLine(left, top, left, bottom, 2, 0.015, 10));
lines.push(...splitLine(right, top, right, bottom, 2, 0.015, 10));

/* =========================
   2️⃣ CỬA (vẽ sau)
   ========================= */
const doorDelay = 60;
lines.push(...splitLine(doorX, doorY, doorX + doorW, doorY, 1, 0.02, doorDelay));
lines.push(...splitLine(doorX, doorY + doorH, doorX + doorW, doorY + doorH, 1, 0.02, doorDelay));
lines.push(...splitLine(doorX, doorY, doorX, doorY + doorH, 2, 0.02, doorDelay + 5));
lines.push(...splitLine(doorX + doorW, doorY, doorX + doorW, doorY + doorH, 2, 0.02, doorDelay + 5));

/* =========================
   3️⃣ CHI TIẾT (vẽ cuối)
   ========================= */
const detailDelay = 120;

// các nét tường nhỏ
lines.push(...splitLine(left + 40, top + 60, left + 120, top + 60, 2, 0.01, detailDelay));
lines.push(...splitLine(right - 120, top + 80, right - 40, top + 80, 2, 0.01, detailDelay + 5));
lines.push(...splitLine(left + 60, bottom - 60, left + 160, bottom - 60, 3, 0.01, detailDelay + 10));
lines.push(...splitLine(right - 160, bottom - 80, right - 60, bottom - 80, 3, 0.01, detailDelay + 15));

// tay nắm cửa
lines.push(new LineSegment(cx + doorW / 4, doorY + doorH / 2, cx + doorW / 4 + 8, doorY + doorH / 2, 0.03, detailDelay + 20));

/* =========================
   CLICK CỬA → CHUYỂN CẢNH
   ========================= */
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (
    x > doorX &&
    x < doorX + doorW &&
    y > doorY &&
    y < doorY + doorH
  ) {
    transitionOut();
  }
});

function transitionOut() {
  canvas.style.transition = 'opacity 1s';
  canvas.style.opacity = 0;

  setTimeout(() => {
    // TODO: load scene tiếp theo
    // window.location = 'scene1.html';
  }, 1000);
}

/* =========================
   MAIN LOOP
   ========================= */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';

  lines.forEach(l => {
    l.update(frame);
    l.draw(ctx);
  });

  frame++;
  requestAnimationFrame(animate);
}

animate();
