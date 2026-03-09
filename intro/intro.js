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

[W*0.42, H*0.27, W*0.55, H*0.3, true],   // cạnh trên
[W*0.55, H*0.3, W*0.55, H*0.7, true],   // cạnh phải
[W*0.55, H*0.7, W*0.45, H*0.7, true],   // cạnh dưới
[W*0.45, H*0.7, W*0.45, H*0.3, true],   // cạnh trái

[W*0.45, H*0.5, W*0.52, H*0.5, false],  // di chuyển đến tay nắm
[W*0.52, H*0.5, W*0.53, H*0.5, true]    // vẽ tay nắm

]

function draw(){

ctx.clearRect(0,0,W,H)

ctx.lineWidth=2
ctx.strokeStyle="black"
ctx.lineCap="round"


// ===== LUÔN VẼ LẠI CÁC LINE GROUP =====
for(let g=0; g<lineGroups.length; g++){

for(let line of lineGroups[g]){

const x1=line[0]
const y1=line[1]
const x2=line[2]
const y2=line[3]

const cx=(x1+x2)/2
const cy=(y1+y2)/2

const dx=(x2-x1)/2
const dy=(y2-y1)/2

ctx.beginPath()

if(g < groupIndex){

// đã vẽ xong
ctx.moveTo(x1,y1)
ctx.lineTo(x2,y2)

}

else if(g === groupIndex){

// đang vẽ
ctx.moveTo(cx-dx*progress,cy-dy*progress)
ctx.lineTo(cx+dx*progress,cy+dy*progress)

}

ctx.stroke()

}

}


// ===== UPDATE ANIMATION =====
if(groupIndex < lineGroups.length){

progress += 0.01

if(progress >= 1){

progress = 0
groupIndex++

if(groupIndex < lineGroups.length){

setTimeout(draw,500)
return

}

}

}


// ===== VẼ CỬA =====
if(groupIndex >= lineGroups.length){

drawDoor()

}


requestAnimationFrame(draw)

}
  // vtvytbtfrtdtyrvytfrcvrtdtryft byubtyv6rtvrtvtuygbyutgrdedxe vtyvytvyubuybvr6dw4swrxrtcgyv 
function drawDoor(){

if(doorIndex >= doorPath.length) return


// ===== vẽ lại các đoạn cửa đã xong =====
for(let i=0;i<doorIndex;i++){

const s = doorPath[i]

if(!s[4]) continue   // nếu là move không vẽ

ctx.beginPath()
ctx.moveTo(s[0],s[1])
ctx.lineTo(s[2],s[3])
ctx.stroke()

}


// ===== đoạn đang vẽ =====
const s = doorPath[doorIndex]

const x1 = s[0]
const y1 = s[1]
const x2 = s[2]
const y2 = s[3]
const penDown = s[4]

const x = x1 + (x2-x1)*doorProgress
const y = y1 + (y2-y1)*doorProgress


if(penDown){

ctx.beginPath()
ctx.moveTo(x1,y1)
ctx.lineTo(x,y)
ctx.stroke()

}


// ===== chấm vẽ =====
ctx.beginPath()
ctx.arc(x,y,4,0,Math.PI*2)
ctx.fill()


doorProgress += 0.02


if(doorProgress >= 1){

doorProgress = 0
doorIndex++

}

}

draw()

}
