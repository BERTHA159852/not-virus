function startIntro(){

const canvas = document.getElementById("intro-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const H = canvas.height
const W = canvas.width

let progress = 0
let groupIndex = 0
let doorIndex = 0
let doorProgress = 0

// t chạy từ 0 đến 1, hàm trả về giá trị đã được "uốn cong"
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// chia line thành từng nhóm
const lineGroups = [

[
[W*0.05, H*0.1, W*0.05, H*0.4],
[W*0.05, H*0.4, W*0.05, H*0.68],
[W*0.05, H*0.68, W*0.05, H*0.9],
[W*0.05, H*0.1, W*0.35, H*0.1],
[W*0.35, H*0.1, W*0.67, H*0.1],
[W*0.67, H*0.1, W*0.8, H*0.1],
[W*0.8, H*0.1, W*0.95, H*0.1],
[W*0.95, H*0.9, W*0.8, H*0.9],
[W*0.8, H*0.9, W*0.67, H*0.9],
[W*0.67, H*0.9, W*0.35, H*0.9],
[W*0.35, H*0.9, W*0.05, H*0.9],
[W*0.95, H*0.9, W*0.95, H*0.1],
[W*0.95, H*0.9, W*0.95, H*0.68],
[W*0.95, H*0.68, W*0.95, H*0.4],
[W*0.95, H*0.4, W*0.95, H*0.1]
],

[
[W*0.08, H*0.16, W*0.22, H*0.16],
[W*0.12, H*0.105, W*0.12, H*0.155],
[W*0.09, H*0.22, W*0.25, H*0.22],
[W*0.19, H*0.165, W*0.19, H*0.215],
[W*0.75, H*0.105, W*0.75, H*0.155],
[W*0.85, H*0.105, W*0.85, H*0.155],
[W*0.7, H*0.16, W*0.9, H*0.16],
[W*0.8, H*0.165, W*0.8, H*0.215],
[W*0.77, H*0.22, W*0.87, H*0.22],
  
[W*0.4, H*0.25, W*0.6, H*0.25],
[W*0.4, H*0.25, W*0.4, H*0.575],
[W*0.4, H*0.575, W*0.4, H*0.9],
[W*0.6, H*0.25, W*0.6, H*0.575],
[W*0.6, H*0.575, W*0.6, H*0.9],

[W*0.235, H*0.4, W*0.372, H*0.4],
[W*0.28, H*0.46, W*0.36, H*0.46],
[W*0.32, H*0.405, W*0.32, H*0.455],
[W*0.285, H*0.52, W*0.35, H*0.52],

[W*0.65, H*0.4, W*0.78, H*0.4],
[W*0.63, H*0.45, W*0.84, H*0.45],
[W*0.7, H*0.405, W*0.7, H*0.445],

[W*0.12, H*0.7, W*0.28, H*0.7],
[W*0.09, H*0.75, W*0.25, H*0.75],
[W*0.06, H*0.8, W*0.22, H*0.8],
[W*0.15, H*0.705, W*0.15, H*0.745],
[W*0.11, H*0.755, W*0.11, H*0.795],

[W*0.74, H*0.68, W*0.87, H*0.68],
[W*0.68, H*0.73, W*0.92, H*0.73],
[W*0.66, H*0.78, W*0.86, H*0.78],
[W*0.8, H*0.685, W*0.8, H*0.725],
[W*0.75, H*0.735, W*0.75, H*0.775],
[W*0.85, H*0.735, W*0.85, H*0.775]
]

]

const doorPath = [

[W*0.6-H*0.04, H*0.9, W*0.6-H*0.04, H*0.29, true],
[W*0.6-H*0.04, H*0.29, W*0.6, H*0.25, true],
[W*0.6, H*0.25, W*0.6-H*0.04, H*0.29, false],
[W*0.6-H*0.04, H*0.29, W*0.4+H*0.04, H*0.29, true],    
[W*0.4+H*0.04, H*0.29, W*0.4, H*0.25, true],
[W*0.4, H*0.25, W*0.4+H*0.04, H*0.29, false],
[W*0.4+H*0.04, H*0.29, W*0.4+H*0.04, H*0.9, true],
[W*0.4+H*0.04, H*0.9, W*0.4+H*0.08, H*0.85, false],
[W*0.4+H*0.08, H*0.85, W*0.6-H*0.08, H*0.85, true],
[W*0.6-H*0.08, H*0.85, W*0.6-H*0.13, H*0.575, false],
[W*0.6-H*0.13, H*0.575, W*0.6-H*0.08, H*0.575, true]

]

function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";

    // --- VẼ TƯỜNG (Nhiều nét cùng lúc từ tâm) ---
    for (let g = 0; g <= groupIndex && g < lineGroups.length; g++) {
        for (let line of lineGroups[g]) {
            const [x1, y1, x2, y2] = line;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const dx = (x2 - x1) / 2;
            const dy = (y2 - y1) / 2;

            ctx.beginPath();
            if (g < groupIndex) {
                // Nhóm tường đã vẽ xong: Giữ nguyên trên màn hình
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            } else if (g === groupIndex) {
                // Nhóm tường đang vẽ: Toàn bộ các nét trong group lan ra từ tâm
                ctx.moveTo(cx - dx * progress, cy - dy * progress);
                ctx.lineTo(cx + dx * progress, cy + dy * progress);
            }
            ctx.stroke();
        }
    }

    // --- CẬP NHẬT TIẾN ĐỘ TƯỜNG ---
    if (groupIndex < lineGroups.length) {
        progress += 0.01;
        if (progress >= 1) {
            progress = 0;
            groupIndex++;
        }
    } 
    // --- VẼ CỬA (Chỉ bắt đầu khi tường xong) ---
    else {
        drawDoor();
    }

    requestAnimationFrame(draw);
}
  // vtvytbtfrtdtyrvytfrcvrtdtryft byubtyv6rtvrtvtuygbyutgrdedxe vtyvytvyubuybvr6dw4swrxrtcgyv 

function drawDoor() {
    // (Phần vẽ lại các nét cũ giữ nguyên...)
    for (let i = 0; i < doorIndex; i++) {
        const s = doorPath[i];
        if (s[4]) {
            ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); ctx.stroke();
        }
    }

    if (doorIndex < doorPath.length) {
        const s = doorPath[doorIndex];
        const x1 = s[0], y1 = s[1], x2 = s[2], y2 = s[3], penDown = s[4];

        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        // --- ĐIỀU CHỈNH TỐC ĐỘ TẠI ĐÂY ---
        
        // 1. Tốc độ cơ bản cực thấp để tạo vẻ cẩn thận (3 pixel/frame)
        let baseSpeed = 3; 

        // 2. Gia tốc theo thời gian: Càng về các nét sau càng nhanh một chút
        // (Ví dụ: nét thứ 5 sẽ nhanh hơn nét thứ 1)
        const experienceMultiplier = 1 + (doorIndex * 0.2); 

        // 3. Hệ số di chuyển khi nhấc bút (vẫn giữ nhanh hơn vẽ một chút)
        const moveMultiplier = penDown ? 1 : 2;

        // Tính toán tốc độ cuối cùng
        const finalSpeed = baseSpeed * experienceMultiplier * moveMultiplier;
        
        doorProgress += finalSpeed / distance;

        // --- PHẦN VẼ VÀ EASING ---
        const currentProgress = Math.min(doorProgress, 1);
        const easedT = easeInOutQuad(currentProgress); // Giữ mượt ở 2 đầu nét vẽ

        const curX = x1 + dx * easedT;
        const curY = y1 + dy * easedT;

        if (penDown) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(curX, curY);
            ctx.stroke();
        }

        // Vẽ đầu bút
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (doorProgress >= 1) {
            doorProgress = 0;
            doorIndex++;
        }
    } else {
        // Giữ bút ở điểm cuối
        const last = doorPath[doorPath.length - 1];
        ctx.beginPath(); ctx.arc(last[2], last[3], 3.5, 0, Math.PI * 2); ctx.fill();
    }
}

draw()

}
