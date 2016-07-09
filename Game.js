window.addEventListener("load",function(){

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;;
  }

  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();

  knight = new Player(300, 300);

});

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 80;
  this.height = 100;
  //this.health = health;
  //this.attacks = 10;
  this.render = function() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.update = function() {

  }
  setInterval(this.render(), 10);
}
