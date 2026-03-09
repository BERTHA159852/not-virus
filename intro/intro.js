function startIntro(){

const canvas = document.getElementById("intro-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const H = canvas.height
const W = canvas.width

let progress = 0
let groupIndex = 0



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
[W*0.296, H*0.46, W*0.36, H*0.46],
[W*0.31, H*0.405, W*0.31, H*0.455],
[W*0.3, H*0.52, W*0.35, H*0.52]
]

]



function draw(){

ctx.clearRect(0,0,W,H)

ctx.lineWidth = 2
ctx.strokeStyle = "black"
ctx.lineCap = "round"

for(let g=0; g<=groupIndex; g++){

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

// nhóm đã xong
if(g < groupIndex){

ctx.moveTo(x1,y1)
ctx.lineTo(x2,y2)

}

// nhóm đang vẽ
else{

ctx.moveTo(cx-dx*progress, cy-dy*progress)
ctx.lineTo(cx+dx*progress, cy+dy*progress)

}

ctx.stroke()

}
}


progress += 0.005


if(progress < 1){

requestAnimationFrame(draw)

}else{

// reset progress
progress = 0


// sang nhóm tiếp theo
groupIndex ++


if(groupIndex < lineGroups.length){

setTimeout(draw,500)

}else{

loadStory()

}

}

}

draw()

}
