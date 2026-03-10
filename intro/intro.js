function startIntro() {
    const canvas = document.getElementById("intro-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const H = canvas.height;
    const W = canvas.width;

    // Khai báo biến trạng thái
    let isHoveringDoor = false; 
    let state = "DRAWING";
    let progress = 0;
    let groupIndex = 0;
    let doorIndex = 0;
    let doorProgress = 0;

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        isHoveringDoor = isMouseOverDoor(mx, my, W, H);
        
        if (state === "IDLE") {
            canvas.style.cursor = isHoveringDoor ? "pointer" : "default";
        }
    });

    // Hàm bổ trợ giữ nguyên
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }


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
        ctx.shadowBlur = 0; // Reset shadow mỗi khung hình

        // 1. Vẽ tường
        for (let g = 0; g <= groupIndex && g < lineGroups.length; g++) {
            for (let line of lineGroups[g]) {
                const [x1, y1, x2, y2] = line;
                const cx = (x1 + x2) / 2;
                const cy = (y1 + y2) / 2;
                const dx = (x2 - x1) / 2;
                const dy = (y2 - y1) / 2;

                ctx.beginPath();
                if (g < groupIndex) {
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                } else if (g === groupIndex) {
                    ctx.moveTo(cx - dx * progress, cy - dy * progress);
                    ctx.lineTo(cx + dx * progress, cy + dy * progress);
                }
                ctx.stroke();
            }
        }

        // 2. Cập nhật tiến trình vẽ tường hoặc vẽ cửa
        if (groupIndex < lineGroups.length) {
            progress += 0.01;
            if (progress >= 1) {
                progress = 0;
                groupIndex++;
            }
        } else {
            drawDoor(); // Vẽ cánh cửa
            
            // Nếu đã vẽ xong cửa thì chuyển sang trạng thái IDLE
            if (doorIndex >= doorPath.length) {
                state = "IDLE";
            }
        }

        // 3. CHỈ VẼ VIỀN SÁNG KHI ĐANG HOVER VÀ ĐÃ VẼ XONG
        if (state === "IDLE" && isHoveringDoor) {
            drawDoorGlow(ctx, W, H);
        }

        // CHỈ GỌI 1 LẦN DUY NHẤT Ở ĐÂY
        requestAnimationFrame(draw);
    }

    // Các hàm phụ trợ tách biệt
    function isMouseOverDoor(mx, my, W, H) {
        const x1 = W * 0.4;
        const y1 = H * 0.25;
        const x2 = W * 0.6;
        const y2 = H * 0.9;
        return mx >= x1 && mx <= x2 && my >= y1 && my <= y2;
    }

    function drawDoorGlow(ctx, W, H) {
        ctx.save();
        const x = W * 0.4;
        const y = H * 0.25;
        const w = W * 0.2;
        const h = H * 0.65;

        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)"; 
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;                   
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; 
        
        ctx.strokeRect(x, y, w, h); // Chỉ vẽ khung hình chữ nhật
        ctx.restore();
    }

    function drawDoor() {
        // Đảm bảo nét vẽ cửa luôn đen, không bị dính shadow
        ctx.strokeStyle = "black";
        ctx.shadowBlur = 0;

        for (let i = 0; i < doorIndex; i++) {
            const s = doorPath[i];
            if (s[4]) {
                ctx.beginPath();
                ctx.moveTo(s[0], s[1]);
                ctx.lineTo(s[2], s[3]);
                ctx.stroke();
            }
        }
        
        if (doorIndex < doorPath.length) {
            const s = doorPath[doorIndex];
            const dx = s[2] - s[0];
            const dy = s[3] - s[1];
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const currentSpeed = s[4] ? 3 : 6; 

            doorProgress += currentSpeed / distance;
            const p = Math.min(doorProgress, 1);
            const easedT = easeInOutQuad(p);
            const curX = s[0] + dx * easedT;
            const curY = s[1] + dy * easedT;

            if (s[4]) {
                ctx.beginPath();
                ctx.moveTo(s[0], s[1]);
                ctx.lineTo(curX, curY);
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(curX, curY, 4, 0, Math.PI * 2);
            ctx.fill();

            if (doorProgress >= 1) {
                doorProgress = 0;
                doorIndex++;
            }
        } else {
            const last = doorPath[doorPath.length - 1];
            ctx.beginPath();
            ctx.arc(last[2], last[3], 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    draw(); // Khởi chạy vòng lặp
}
