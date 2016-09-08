window.addEventListener("load", function(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  keyState = {};
	window.addEventListener('keydown',function(e){
		keyState[e.keyCode || e.which] = true;
	},true);
	window.addEventListener('keyup',function(e){
		keyState[e.keyCode || e.which] = false;
	},true);


  Initialize();
});

var player = {
  width: 50,
  height: 50,
  x: 50,
  y: 50,
  health: 100,
  attack: 10,
  speed: 8,
}

var enemy = {
  width: 50,
  height: 50,
  x: 200,
  y: 50,
  health: 50,
  attack: 15,
  speed: 4,
}

var spawn = {
  width: 80,
  height: 80,
  x: 500,
  y: 500,
}


function Initialize() {
  scoreNumber = 0;
  enemyAmount = 20;

  Drawing = setInterval(function(){draw()}, 10);
  keyLoop();
}

function makePlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function makeEnemy() {
  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function makeSpawn() {
  spawn.x = (canvas.width / 2) - (spawn.width / 2);
  ctx.rect(spawn.x, spawn.y, spawn.width, spawn.height);
  ctx.stroke();
  ctx.lineWidth = "10";
}

function keyLoop() {
  var keyArrowLeft = 37;
	var keyArrowRight = 39;
  var keyArrowUp = 38;
  var keyArrowDown = 40;


	var key_A_Left = 65;
	var key_D_Right = 68;
  var key_W_Up = 87;
  var key_W_Down = 83;

	if (keyState[keyArrowLeft] || keyState[key_A_Left]) {
    player.x -= player.speed;
	}

  if (keyState[keyArrowRight] || keyState[key_D_Right]) {
    player.x += player.speed;
  }

  if (keyState[keyArrowUp] || keyState[key_W_Up]) {
    player.y -= player.speed;
  }

  if (keyState[keyArrowDown] || keyState[key_W_Down]) {
    player.y += player.speed;
  }

	setTimeout(keyLoop, 20);
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  makePlayer();
  makeEnemy();
  makeSpawn();
}

function update() {

}
