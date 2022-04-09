var timeCounter
var player = {
    lv: 0,
    score: 0,
    hitted: false,
    missTotal: 0,
    balls: []
}

const lvSettings = {
    1: {
        levelName: "Grid Shot Normal Mode",
        numBalls: 6,
        isBallMovement: false,
        maxTime: 3,
        missScore: 120,
        requestScore: 10,
        hitScore: 173,
        ballSize : 80,
        ballColor : 'aqua',
        background : 'grey'
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

function startTimer(config, display) {
    var timer = config.maxTime, minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.innerHTML = `Time: <span style color="black"> ${minutes}:${seconds} </span>`;

    
    timeCounter = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = `Time: <span style color="black"> ${minutes}:${seconds} </span>`;

        if (--timer < 0) {
            if(player.score < config.requestScore){
                failedPage(config)
                return
            }
            successPage(config)
            return
        }
    }, 1000);
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
    const timeLabel = document.getElementById("timecount")
    const config = lvSettings[lv]


    areaBall.addEventListener('click', ()=>{
        missShot(config)
    })

    changeBackGroundLv(config.background)

    for (let i = 0; i < config.numBalls; i++) {
        addNewBall(config)
    }

    startTimer(config, timeLabel)
}

function resetPlayer(){
    player.score = 0
    player.hitted = false
    player.balls = []
}

function startAim(lv){ // เริ่มเกม
    var window = document.getElementsByClassName('main-container')[0]
    player.lv = lv

    window.innerHTML = `
        <div id="area_ball"></div>
        <div id="score">Level: <span style="color: red">${player.lv}</span> Score: <span style="color: gold">${player.score}</span></div>
        <div id="timecount">Time: <span style color="black"> 00:00 </span></div>
        <div id="restart-btn"> Restart </div>
    `

    document.getElementById('restart-btn').addEventListener('click', function(){
        resetPlayer()
        startAim(player.lv)
    })
    randomSpawnTarget(player.lv)
}

function successPage(config){
    clearInterval(timeCounter)

    var window = document.getElementsByClassName('main-container')[0]
    player.lv++;
    window.innerHTML = `
        <div id="area_ball">
            <br>
            <br>
            <br>
            <br>
            <br>
            <span style="font-size: 60px;">${config.levelName}</span><br>
            <span style="font-size: 150px; color:greenyellow">Pass !</span><br>
            <span style="font-size: 45px; color: gold">Score: ${player.score} <br> Miss: ${player.missTotal}</span>
        </div>
        <div id="restart-btn"> Next Level </div>
    `
    document.getElementById('restart-btn').addEventListener('click', function(){
        resetPlayer()
        startAim(player.lv)
    })
}

function failedPage(config){
    clearInterval(timeCounter)

    var window = document.getElementsByClassName('main-container')[0]
    window.innerHTML = `
        <div id="area_ball">
            <br>
            <br>
            <br>
            <br>
            <br>
            <span style="font-size: 60px;">${config.levelName}</span><br>
            <span style="font-size: 150px; color:red">Failed :(</span><br>
            <span style="font-size: 45px; color: gold">Score: ${player.score} <br> Miss: ${player.missTotal}</span>
        </div>
        <div id="restart-btn"> Restart </div>
    `
    document.getElementById('restart-btn').addEventListener('click', function(){
        resetPlayer()
        startAim(player.lv)
    })
}