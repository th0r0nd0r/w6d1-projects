/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);


function GameView(ctx) {
  this.ctx = ctx;
  this.game =  new Game();
  // this.game = this.bind(this);
  this.game.addAsteroids();

}

GameView.prototype.start = function() {

  setInterval( () => {
    this.game.draw(this.ctx);
  }, 20);
  setInterval( () => this.game.step(), 20);


};

window.GameView = GameView;

document.addEventListener("DOMContentLoaded", function(){

  const canvasEl = document.getElementById("testing");

  let ctx = canvasEl.getContext("2d");


  const gv = new GameView(ctx);
  gv.start();

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(2);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(3);
const MovingObject = __webpack_require__(4);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, SuperClass) {
    childClass.prototype = Object.create(SuperClass.prototype);
    childClass.prototype.constructor = childClass;
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


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


/***/ })
/******/ ]);