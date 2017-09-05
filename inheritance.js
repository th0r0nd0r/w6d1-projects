Function.prototype.inherits = function(SuperClass) {
  let Surrogate = function Surrogate() {};
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits2 = function(SuperClass) {
  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};

// class MovingObject2 {
//   move2() {
//     console.log("Im moving2");
//   }
// }
function MovingObject () {
  function move () {
    console.log("I moved!");
  }
}
MovingObject.prototype.move = () => { console.log( "I moved");};

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {
  function rock () {
    console.log("I am a rock");
  }
}
Asteroid.inherits(MovingObject);

Ship.prototype.fly = () => {console.log("I'm flying!!");};

let s = new Ship();
// console.log(s.__proto__);
s.fly();
s.move();
