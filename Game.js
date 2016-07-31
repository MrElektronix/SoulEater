window.addEventListener("load", function(){
  StartGame();
  function resizeCanvas() {
    Game.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    Game.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
});

var Knight, Swine;
var Enemy = [];
var j = 0;

function StartGame() {
  Game.start();
  Knight = new Component(50, (Game.canvas.height - 200), 100, 100, "black", 5, 100, 5,"Player");
  //Swine = new Component(600, (Game.canvas.height - 200), 100, 100, "green", 5, 50, 15,"Enemy"))
  Enemy_Amount = 10;
  for (var i = 0; i < Enemy_Amount; i++) {
    Enemy.push(new Component(Math.floor(Math.random()*(Game.canvas.width)+300), (Game.canvas.height - 200), 100, 100, "green", 5, 50, 15,"Enemy"));
  }
}

var Game = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;;
    this.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(UpdateGame, 10);
    key = [];
    document.addEventListener("keydown", function(e){
      key[e.keyCode] = true;
    });

    document.addEventListener("keyup", function(e){
      delete key[e.keyCode];
    });

    LeftKey = 37;
    UpKey = 38;
    RightKey = 39;
    DownKey = 40;

    A_LeftKey = 65;
    S_DownKey = 83;
    W_UpKey = 87;
    D_RightKey = 68;
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function Component(xpos, ypos, width, height, color, speed, health, attack, type) {
  this.x = xpos;
  this.y = ypos;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.health = health;
  this.attack = attack;
  this.Type = type;
  this.draw = function() {
    ctx = Game.ctx;
    if (this.Type == "Player") {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.healthBar(this.health);
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(this.x + 20, this.y + 20, 7, 0, 2 * Math.PI);
      ctx.arc(this.x + 60, this.y + 20, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x + 40, this.y + 45, 25, 0, 1 * Math.PI);
      ctx.fill();
    }
    else if (this.Type == "Enemy") {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.healthBar(this.health);
    }
  }
  this.update = function() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x > (Game.canvas.width - this.width)) {
      this.x = Game.canvas.width - this.width;
    }
    if (this.y > (Game.canvas.height - this.height)) {
      this.y = Game.canvas.height - this.height;
    }
  }

  this.healthBar = function(health) {
      ctx.beginPath();
      ctx.font = "30px Arial";
      x = this.x;
      y = this.y - 60;
      health_text = this.health;
      health_bar = this.health;
      thickness = 15;
      ctx.lineWidth = 3;
      ctx.fillStyle = "black";
      ctx.fillText(health_text,x, y-10);
      ctx.strokeRect(x, y, health_bar, thickness);
      ctx.rect(x, y, health_bar, thickness)
      if(health_text > 43){
          ctx.fillStyle = "green"
      } else if(health_text > 27){
        ctx.fillStyle = "orange";
      } else{
        ctx.fillStyle = "red";
      }
      ctx.closePath();
      ctx.fill();
  }
}

window.onclick = function(){
  Enemy[j].health -= Knight.attack;
  if (Enemy[j].health <= 0) {
    Enemy[j].health = 0;
    console.log("Enemy is dead");
      j++;
  }
  console.log(i);
  }



Component.prototype.keys = function() {;
    if (key[W_UpKey] || key[UpKey]) {
      this.y -= this.speed;
    }
    if (key[A_LeftKey] || key[LeftKey]) {
      this.x -= this.speed;
    }
    if (key[S_DownKey] || key[DownKey]) {
      this.y += this.speed;
    }
    if (key[D_RightKey] || key[RightKey]) {
      this.x += this.speed;
    }
};

function UpdateGame() {
  Game.clear();
  Knight.keys();
  Knight.update();
  //Swine.update();

  Knight.draw();
  //Swine.draw();

  Enemy[j].draw();
  Enemy[j].update();


}
