const Util = require("./util");
const MovingObject = require("./moving_object");

function Ship() {
  let options = {};
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = [0, 0];
  options.pos = [1000,1000];

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.randomPosition = function (){

};


Ship.COLOR = 'red';
Ship.RADIUS= 60;
