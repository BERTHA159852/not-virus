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
[W/2-H*0.5, H*0.4, W/2+H*0.5, H*0.4],
[W/2-H*0.5, H*0.6, W/2+H*0.5, H*0.6],
[W/2, H*0.2, W/2, H*0.8],
[W/2-H*0.3, H*0.3, W/2-H*0.3, H*0.7],
[W/2+H*0.3, H*0.3, W/2+H*0.3, H*0.7]
],

[
[W/2-H*0.2, H*0.5, W/2+H*0.2, H*0.5],
[W/2-H*0.1, H*0.35, W/2-H*0.1, H*0.65],
[W/2+H*0.1, H*0.35, W/2+H*0.1, H*0.65],
[W/2-H*0.15, H*0.45, W/2-H*0.05, H*0.45],
[W/2+H*0.05, H*0.45, W/2+H*0.15, H*0.45]
]

]



function draw(){

ctx.clearRect(0,0,W,H)

ctx.lineWidth = 2
ctx.strokeStyle = "black"
ctx.lineCap = "round"



for(let g=0; g<=groupIndex; g++){

for(let line of lineGroups[g]){

const x1 = line[0]
const y1 = line[1]
const x2 = line[2]
const y2 = line[3]

const cx = (x1+x2)/2
const cy = (y1+y2)/2

const dx = (x2-x1)/2
const dy = (y2-y1)/2


ctx.beginPath()

ctx.moveTo(cx-dx*progress, cy-dy*progress)
ctx.lineTo(cx+dx*progress, cy+dy*progress)

ctx.stroke()

}

}


progress += 0.02


if(progress < 1){

requestAnimationFrame(draw)

}else{

// reset progress
progress = 0


// sang nhóm tiếp theo
groupIndex ++


if(groupIndex < lineGroups.length){

setTimeout(draw,1000)

}else{

loadStory()

}

}

}

draw()

}
