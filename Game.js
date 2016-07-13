window.addEventListener("load",function(){

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;;
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
  UpKey = 38;
  RightKey = 39;
  DownKey = 40;

  A_LeftKey = 65;
  S_DownKey = 83;
  W_UpKey = 87;
  D_RightKey = 68;

  var knight = new Player();
  var swine = new Enemy();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    knight.render();
    knight.update()

    swine.render();
    swine.update();
  }
  setInterval(animate, 10);
});

var Player = function() {
  var self = this;
  this.x = 300;
  this.y = 768;
  this.width = 80;
  this.height = 100;
  this.health = 100;
  this.attack = 10;
  this.speed = 5;
  this.render = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Arial";
    ctx.fillText(this.health,(this.x + (this.width / 4)),this.y);
    self.healthBar((this.x + (this.width + 20)),this.y - 30, self.health, 300, 10);
  }
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

      if (key[A_LeftKey] || key[LeftKey]) {
        this.x -= this.speed;
      }
      if (key[D_RightKey] || key[RightKey]) {
        this.x += this.speed;
      }
      /*
      if (key[W_UpKey] || key[UpKey]) {
        this.y -= this.speed;
      }
      if (key[S_DownKey] || key[DownKey]) {
        this.y += this.speed;
      }
      */
    }
    this.Keys();
  }
  this.healthBar = function(x, y, per, width, thickness) {
      ctx.beginPath();
      ctx.rect(x-width/2, y, width*(per/100), thickness)
      if(per > 43){
          ctx.fillStyle="green"
      }else if(per > 27){
        ctx.fillStyle="orange";
      }else{
        ctx.fillStyle="red";
      }
      ctx.font = "30px Arial";
      ctx.fillText(this.health,(this.x + (this.width + 20)),this.y - 30);
      ctx.closePath();
      ctx.fill();
  }

}

var Enemy = function() {
  var self = this;
  this.x = 1200;
  this.y = 768;
  this.width = 80;
  this.height = 100;
  this.health = 50;
  this.render = function() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    self.healthBar((this.x + (this.width + 20)),this.y - 30, self.health, 300, 10);
  }
  this.update = function() {

  }
  this.healthBar = function(x, y, per, width, thickness) {
      ctx.beginPath();
      ctx.rect(x-width/2, y, width*(per/100), thickness)
      if(per > 43){
          ctx.fillStyle="green"
      }else if(per > 27){
        ctx.fillStyle="orange";
      }else{
        ctx.fillStyle="red";
      }
      ctx.font = "30px Arial";
      ctx.fillText(this.health,(this.x + (this.width + 20)),this.y - 30);
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
