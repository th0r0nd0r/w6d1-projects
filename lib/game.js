const Asteroid = require("./asteroid");
// window.Asteroid = Asteroid;

function Game() {

  this.asteroids = [];

}

Game.DIM_X = '2000';
Game.DIM_Y = '2000';
Game.NUM_ASTEROIDS = '4';

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({game: this, pos: this.randomPosition()}));
  }
};

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * Game.DIM_X) + 1;
  let y = Math.floor(Math.random() * Game.DIM_Y) + 1;
  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach((asteroid)=> asteroid.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach((asteroid)=> asteroid.move());
};

Game.prototype.wrap = function(pos) {
  if (pos[0] <= 0) {
    pos[0] = Game.DIM_X - 1;
  } else {
    pos[0] = pos[0] % Game.DIM_X;
  }

  if (pos[1] <= 0) {
    pos[1] = Game.DIM_Y - 1  ;
  } else {
    pos[1] = pos[1] % Game.DIM_Y;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
  this.asteroids.forEach((asteroid, i) => {
    this.asteroids.forEach((asteroid2, j) => {
      if (i === j) {
        return;
      } else {
        if (asteroid.isCollidedWith(asteroid2)) {
          // alert("COLLISION");
          asteroid.collideWith(asteroid2);
        }
      }
    });
  });
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

window.Game = Game;
module.exports = Game;
