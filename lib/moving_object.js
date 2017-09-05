
function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;

}
//
MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false);
    ctx.closePath();
    ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos = this.game.wrap(this.pos);
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  return (distance(this.pos, otherObject.pos) <= (this.radius + otherObject.radius));
};

function distance(pos1, pos2) {
  return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]),2));
}

MovingObject.prototype.collideWith = function(otherObject) {
  // if (this.isCollidedWith(otherObject)) {
    this.game.remove(otherObject);
    this.game.remove(this);
  // }
};

module.exports = MovingObject;





// document.addEventListener("DOMContentLoaded", function(){
//   const canvasEl = document.getElementById("testing");
//
//   let ctx = canvasEl.getContext("2d");
//
// });

// const mo = new MovingObject(
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );
