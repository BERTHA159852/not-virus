// ===== LẤY CANVAS =====

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// ===== CHỈNH KÍCH THƯỚC CANVAS =====

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ===== STYLE CỦA ĐƯỜNG =====

ctx.lineWidth = 3;
ctx.strokeStyle = "black";


// ===== HÀM VẼ MỘT ĐƯỜNG =====

function drawLine(x1, y1, x2, y2){

    ctx.beginPath();      // bắt đầu path mới

    ctx.moveTo(x1, y1);   // di chuyển bút tới điểm đầu

    ctx.lineTo(x2, y2);   // vẽ tới điểm cuối

    ctx.stroke();         // render đường

}


// ===== HÀM CHỜ (sleep) =====

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}


// ===== DANH SÁCH CÁC ĐƯỜNG =====

let lines = [

    [100,100,300,100],  // A -> B
    [300,100,300,300],  // C -> D
    [300,300,100,300],  // E -> F
    [100,300,100,100],  // G -> H
    [100,200,300,200]   // I -> J

];


// ===== HÀM INTRO =====

async function drawIntro(){

    for(let line of lines){

        let x1 = line[0];
        let y1 = line[1];
        let x2 = line[2];
        let y2 = line[3];

        drawLine(x1,y1,x2,y2);

        await sleep(1000); // đợi 1 giây

    }

}


// ===== CHẠY INTRO =====

drawIntro();
