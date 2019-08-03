const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");

canvas.height = 500
canvas.width = 350

const ch = canvas.height
const cw = canvas.width

const playerXPosition = 50
let playerYPosition = ch/2

const playerSize = 20

let ySpeed = 1

let pipe1x = cw
let pipe1y = 0
let pipe1height
const pipewidth = 100
randomPipe()

let pipe2x = cw
let pipe2y = pipe1height + 150

function table(){
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 0, cw, ch)
}

function player(){
    ctx.fillStyle = 'yellow'
    ctx.fillRect(playerXPosition, playerYPosition, playerSize, playerSize)
}

function gravity(){
    playerYPosition += ySpeed
    ySpeed += .2
}

function jump(e){
    if(e.which == 32){
        playerYPosition -= 60
        ySpeed = 1
    }

}

function pipe(){
    ctx.fillStyle = "green"
    ctx.fillRect(pipe1x,pipe1y,pipewidth,pipe1height)
    ctx.fillStyle = "red"
    ctx.fillRect(pipe2x,pipe2y,pipewidth, ch)
    pipe1x -= 4
    pipe2x -= 4
}

function newpipe(){
    if (pipe1x+pipewidth <= 0){
        randomPipe()
        pipe1x = cw
        pipe2x = cw
        pipe2y = pipe1height+150
        pipe()
    }
}

function randomPipe(){
    pipe1height = (Math.random()* (400-100+1))+100
}

function colision(){
    if(playerXPosition + playerSize >= pipe1x && playerYPosition < pipe1height){
        clearInterval(interval)
        ctx.fillStyle = "red"
        ctx.fillRect(0,0,cw,ch)
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "yellow"
        ctx.textAlign = "center"
        ctx.fillText("Jebłeś w rurę", cw/2,ch/2)
    }
    else if(playerXPosition + playerSize >= pipe2x && playerYPosition + playerSize > pipe2y){
        clearInterval(interval)
        ctx.fillStyle = "red"
        ctx.fillRect(0,0,cw,ch)
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "yellow"
        ctx.textAlign = "center"
        ctx.fillText("Jebłeś w rurę", cw/2,ch/2)
    }

    else if(playerYPosition <= 0 || playerYPosition + playerSize >= ch){
        clearInterval(interval)
        ctx.fillStyle = "red"
        ctx.fillRect(0,0,cw,ch)
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "yellow"
        ctx.textAlign = "center"
        ctx.fillText("Jebłeś w ścianę", cw/2,ch/2)
    }
}






document.addEventListener("keypress", jump)

function game(){
    table()
    player()
    gravity()
    pipe()
    newpipe()
    colision()
}


const interval = setInterval(game, 1000/60)
