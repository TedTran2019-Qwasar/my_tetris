import GameView from './gameView.js'
import Game from './game.js';

window.addEventListener('DOMContentLoaded', event => {
  const canvas = document.getElementById('game-canvas');
  const holdCanvas = document.getElementById('hold-canvas');
  const nextCanvas = document.getElementById('next-canvas');
  const ctx = canvas.getContext('2d');
  const holdCtx = holdCanvas.getContext('2d');
  const nextCtx = nextCanvas.getContext('2d');
  const game = new Game();
  const gv = new GameView(game, ctx, holdCtx, nextCtx);
  gv.start();
})
