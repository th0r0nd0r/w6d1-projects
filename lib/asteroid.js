const Util = require("./util");
const MovingObject = require("./moving_object");
// const Bullet = require("./bullet");

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(Math.random()*50);
  // check later
  MovingObject.call(this, options);
}

Asteroid.COLOR = "blue";
Asteroid.RADIUS = 70;


Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;

let ast = new Asteroid({pos:[0,0]});
