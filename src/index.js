import GameView from './gameView.js'
import Game from './game.js';

window.addEventListener('DOMContentLoaded', event => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game();
  const gv = new GameView(game, ctx);
  gv.start();
})
