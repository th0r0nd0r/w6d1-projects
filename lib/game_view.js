const Game = require('./game');


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
