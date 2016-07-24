window.addEventListener("load",function(){

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  key = [];

  document.addEventListener("keydown", function(e){
    key[e.keyCode] = true;
  });

  document.addEventListener("keyup", function(e){
    delete key[e.keyCode];
  });


  LeftKey = 37;
  //UpKey = 38;
  RightKey = 39;
  //DownKey = 40;

  A_LeftKey = 65;
  //S_DownKey = 83;
  //W_UpKey = 87;
  D_RightKey = 68;


  var knight = new Component(300, canvas.height - 180, 80, 100, "red", 100, 10, 5, true, true);
  var swine = new Component(1300, canvas.height - 180, 80, 100, "blue", 50, 20, 0, false, false);

  knightSprite = new Image();
  knightSprite.src = "knight_sprite.png";

  knightSprite.addEventListener("load", function(){
    setInterval(animate, 10);
  });


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    knight.update()
    knight.draw();

    swine.update();
    swine.draw();
  }
});

function Component(x, y, width, height, color, health, attack, speed, useKeys, hasImage) {
  var self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.health = health;
  this.attack = attack;
  this.speed = speed;
  this.useKeys = useKeys;
  this.hasImage = hasImage;
  this.update = function() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x > (canvas.width - this.width)) {
      this.x = canvas.width - this.width;
    }
    if (this.y > (canvas.height - this.height)) {
      this.y = canvas.height - this.height;
    }

    this.Keys = function() {
      if (this.useKeys == true) {
        if (key[A_LeftKey] || key[LeftKey]) {
          this.x -= this.speed;
        }
        if (key[D_RightKey] || key[RightKey]) {
          this.x += this.speed;
        }
      }
    }
    this.Keys();

  }
  this.draw = function() {
    if (this.hasImage) {
      ctx.drawImage(knightSprite,this.x, this.y, this.width, this.height);
      this.healthBar(this.health);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.healthBar(this.health);
    }
  }

  this.healthBar = function(health) {
      ctx.beginPath();
      ctx.font = "30px Arial";
      x = this.x;
      y = this.y - 60;
      health = this.health;
      width = this.health * 2;
      thickness = 15;
      ctx.lineWidth = 3;
      ctx.fillStyle = "black";
      ctx.fillText(health,x, y-10);
      ctx.strokeRect(x, y, width, thickness);
      ctx.rect(x, y, width, thickness)
      if(health > 43){
          ctx.fillStyle = "green"
      } else if(health > 27){
        ctx.fillStyle = "orange";
      } else{
        ctx.fillStyle = "red";
      }
      ctx.closePath();
      ctx.fill();
  }

  window.onclick = function(e){
    if (e.button == 0) {
      self.health -= 10;
      if (self.health <= 0) {
        self.health = 0;
        setTimeout(function(){
          alert("Enemy Dead");
        }, 60)
      }
    }
  }
}
