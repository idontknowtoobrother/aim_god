
var player = {
    lv: 0,
    score: 0,
    hitted: false,
    missTotal: 0,
    balls: []
}

const lvSettings = {
    1: {
        numBalls: 6,
        maxTime: 90,
        missScore: 120,
        hitScore: 150,
        ballSize : 80,
        ballColor : 'aqua',
        background : 'white'
    }
}

function randomInt(length){
    return Math.floor(Math.random() * length)
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function changeBackGroundLv(lv) {
    var colorLv = lv == 1 ? 'white' : lv == 2 ? 'black' : 'red'
	var elements = document.getElementById('area_ball');
	for(var i = 0; i < elements.length; i++){
        elements[i].style.background = 'none';
		elements[i].style.backgroundColor = colorLv;
	}
}

function randonPositionBall(){
    var isSuccess = true
    var position

    if(player.balls.length < 1){
        return {
            left: randomInt(70),
            top: randomInt(70)
        }
    }

    do{
        position = {
            left: randomInt(70),
            top: randomInt(70)
        }

        player.balls.forEach(ball => {
            if(
                position.left == ball.style.left && position.top == ball.style.top
            ){
                isSuccess == false
                return
            }
        })

    }while(!isSuccess)

    return position
}

function refreshScore(){
    var scoreLabel = document.getElementById('score')
    scoreLabel.innerHTML = `Level: <span style="color: red">${player.lv}</span> Score: <span style="color: gold">${player.score}</span>`
}

function missShot(config){
    if(player.hitted){
        player.hitted = false
        return
    }
    player.score = player.score - config.missScore < 1 ? 0 : player.score - config.missScore
    player.missTotal++
    refreshScore()
}

function hitShot(config, ball){
    player.hitted = true
    player.score += config.hitScore
    

    const ballIndex = player.balls.indexOf(ball)
    if(ballIndex > -1){
        player.balls.splice(ballIndex, 1)
    }
    ball.style.background = 'red';
    setTimeout(function(){
        ball.remove()
    }, 30)
    addNewBall(config)
    refreshScore()
    
}

function addNewBall(config){
    const areaBall = document.getElementById("area_ball")
    let ball = document.createElement("div")
    ball.classList.add("ball");
    ball.style.background = config.ballColor

    const positionBall = randonPositionBall(config.ballSize)

    ball.style.left = `${positionBall.left}%`
    ball.style.top = `${positionBall.top}%`
    
    ball.style.width = `${config.ballSize}px`
    ball.style.height = ball.style.width
    
    ball.addEventListener('click', () => {
        hitShot(config, ball)
    })

    player.balls.push(ball)
    areaBall.append(ball)
}

function randomSpawnTarget(lv){

    const areaBall = document.getElementById("area_ball")
    const config = lvSettings[lv]


    areaBall.addEventListener('click', ()=>{
        missShot(config)
    })

    changeBackGroundLv(config.background)

    for (let i = 0; i < config.numBalls; i++) {
        addNewBall(config)
    }

    let o = 1
    player.balls.forEach(ball => {
        console.log(`Ball (${o})\n   top: ${ball.style.top} | left: ${ball.style.left}}`);
        o++
    })
}

function resetPlayer(){
    player.score = 0
    player.hitted = false
    player.balls = []
}

function startAim(lv){ // เริ่มเกม
    var window = document.getElementsByClassName('main-container')[0]
    player.lv = lv

    document.getElementById
    window.innerHTML = `
        <div id="area_ball"></div>
        <div id="score">Level: <span style="color: red">${player.lv}</span> Score: <span style="color: gold">${player.score}</span></div>
        <div id="restart-btn"> Restart </div>
    `

    document.getElementById('restart-btn').addEventListener('click', function(){
        resetPlayer()
        startAim(player.lv)
    })
    randomSpawnTarget(player.lv)
}

