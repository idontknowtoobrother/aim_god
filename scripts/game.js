var timeCounter
var player = {
    lv: 0,
    score: 0,
    hitted: false,
    missTotal: 0,
    balls: [],
    lastPositionHit: {
        top: 0,
        left: 0
    }
}
var arrayGrid = [
    {
        top: 5,
        left: 5
    },
    {
        top: 20,
        left: 5
    },
    {
        top: 35,
        left: 5
    },
    {
        top: 50,
        left: 5
    },
    {
        top: 65,
        left: 5
    },
    {
        top: 80,
        left: 5
    },
    {
        top: 5,
        left: 20
    },
    {
        top: 20,
        left: 20
    },
    {
        top: 35,
        left: 20
    },
    {
        top: 50,
        left: 20
    },
    {
        top: 65,
        left: 20
    },
    {
        top: 80,
        left: 20
    },
    {
        top: 5,
        left: 35
    },
    {
        top: 20,
        left: 35
    },
    {
        top: 35,
        left: 35
    },
    {
        top: 50,
        left: 35
    },
    {
        top: 65,
        left: 35
    },
    {
        top: 80,
        left: 35
    },
    {
        top: 5,
        left: 50
    },
    {
        top: 20,
        left: 50
    },
    {
        top: 35,
        left: 50
    },
    {
        top: 50,
        left: 50
    },
    {
        top: 65,
        left: 50
    },
    {
        top: 80,
        left: 50
    },
    {
        top: 5,
        left: 65
    },
    {
        top: 20,
        left: 65
    },
    {
        top: 35,
        left: 65
    },
    {
        top: 50,
        left: 65
    },
    {
        top: 65,
        left: 65
    },
    {
        top: 80,
        left: 65
    },
    {
        top: 5,
        left: 80
    },
    {
        top: 20,
        left: 80
    },
    {
        top: 35,
        left: 80
    },
    {
        top: 50,
        left: 80
    },
    {
        top: 65,
        left: 80
    },
    {
        top: 80,
        left: 80
    },
]

const lvSettings = {
    1: {
        levelName: "Grid Shot Normal",
        numBalls: 6,
        isBallMovement: false,
        maxTime: 90,
        missScore: 120,
        requestScore: 30000,
        hitScore: 185,
        ballSize : 80,
        ballColor : 'yellow',
        background : 'grey'
    },
    2:  {
        levelName: "Grid Shot Hard",
        numBalls: 6,
        isBallMovement: false,
        maxTime: 90,
        missScore: 120,
        requestScore: 30000,
        hitScore: 185,
        ballSize : 40,
        ballColor : 'yellow',
        background : 'grey'
    },
    3:  {
        levelName: "Grid Shot God Like",
        numBalls: 6,
        isBallMovement: false,
        maxTime: 121,
        missScore: 222,
        requestScore: 50000,
        hitScore: 185,
        ballSize : 40,
        ballColor : 'yellow',
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
    var position = arrayGrid[getRndInteger(0, arrayGrid.length)]

    if(player.balls.length < 1){
        return position
    }

    for(let iv=0; iv < player.balls.length; iv++){
        let ballCheck = player.balls[iv]
        if(`${position.left}%` == ballCheck.style.left && `${position.top}%` == ballCheck.style.top){
            return false
        }
    }

    return position

}

function refreshScore(){
    var scoreLabel = document.getElementById('score')
    scoreLabel.innerHTML = `Level: <span style="color: red">${player.lv}</span> Score: <span style="color: gold">${player.score}</span>`
    player.balls.forEach(ball=>{
        console.log({
            top: ball.style.top,
            left: ball.style.left
        });
    })
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
    player.lastPositionHit = {
        top: ball.style.top,
        left: ball.style.left
    }

    const ballIndex = player.balls.indexOf(ball)
    if(ballIndex > -1){
        player.balls.splice(ballIndex, 1)
    }
    ball.style.background = 'red';
    
    setTimeout(function(){
        ball.remove()
    }, 15)
    
    addNewBall(config)
    refreshScore()
    
}

function addNewBall(config){
    const areaBall = document.getElementById("area_ball")
    let ball = document.createElement("div")
    ball.classList.add("ball");
    ball.style.background = config.ballColor

    let positionBall = randonPositionBall()
    while(positionBall == false){
        positionBall = randonPositionBall()
    }

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
    if(timeCounter != 0){
        clearInterval(timeCounter)
        timeCounter = 0
    }
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