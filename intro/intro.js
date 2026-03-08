function startIntro(){

const canvas=document.getElementById("intro-canvas")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

const H=canvas.height
const W=canvas.width

let progress=0


function draw(){

ctx.clearRect(0,0,W,H)

ctx.lineWidth=2

// ví dụ 1 đường

const x1=W/2-H*0.5
const x2=W/2+H*0.5
const y=H*0.4

const cx=(x1+x2)/2
const dx=(x2-x1)/2

ctx.beginPath()

ctx.moveTo(cx-dx*progress,y)
ctx.lineTo(cx+dx*progress,y)

ctx.stroke()


progress+=0.01

if(progress<1){

requestAnimationFrame(draw)

}else{

// intro xong → load story
loadStory()

}

}

draw()

}
