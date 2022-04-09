
var balls = []
const lvSettings = {
    1: {
        numBalls: 9,
        ballColor : 'blue',
        background : 'white'
    }
}

function randomInt(length){
    return Math.floor(Math.random() * length)
}

function changeBackGroundLv(lv) {
    var colorLv = lv == 1 ? 'white' : lv == 2 ? 'black' : 'red'
	var elements = document.getElementById('area_ball');
	for(var i = 0; i < elements.length; i++){
        elements[i].style.background = 'none';
		elements[i].style.backgroundColor = colorLv;
	}
}


function randomSpawnTarget(window, lv){

    const config = lvSettings[lv]
    changeBackGroundLv(config.background)


    
    // Some random colors
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];


    for (let i = 0; i < config.numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = config.ballColor;
        ball.style.left = `${randomInt(100)}vw`;
        ball.style.top = `${randomInt(100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;
        

        balls.push(ball);
        document.getElementById("area_ball").append(ball);
    }

}

function startAim(){ // เริ่มเกม
    var window = document.getElementsByClassName('main-container')[0]
    window.innerHTML = `
        <div id="area_ball"></div>
    `
    randomSpawnTarget(window, 1)
}

