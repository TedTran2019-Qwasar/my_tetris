export default class GameView {
  constructor(game, ctx, holdCtx, nextCtx) {
    this.game = game;
    this.ctx = ctx;
    this.holdCtx = holdCtx;
    this.nextCtx = nextCtx;
    this.paused = false;
    this.isGameOver = false;
    this.modal = document.querySelector('.modal');
    this.pause = document.querySelector('.pause');
    this.gameOver = document.querySelector('.game-over');
  }
  
  start() {
    this.bindKeyHandlers();
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      if (this.isGameOver) { 
        this.gameOverFunc();
        return 
      };
      if (!this.paused) {
        this.isGameOver = this.game.step();
        this.game.draw(this.ctx, this.holdCtx, this.nextCtx);
      }
      this.animate();
    })
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', (event) => {
      console.log(event.code);
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyX':
        case 'KeyW':
          this.game.pieceManager.rotateRight();
          break;
        case 'Space':
          // Hard Drop
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyC':
          this.game.pieceManager.holdTetrimino();
          break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'KeyZ':
          this.game.pieceManager.rotateLeft();
          break;
        case 'F1':
        case 'KeyP':
          this.togglePause();
          break;
        case 'Escape':
          this.setGameOver();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.game.pieceManager.moveLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.game.pieceManager.moveRight();
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.game.pieceManager.softDrop();
          break;
      }
    });
  }

  togglePause() {
    this.paused = !this.paused;
    this.modal.classList.toggle('active');
    if (this.pause.style.display !== 'block') {
      this.pause.style.setProperty('display', 'block');
    } else {
      this.pause.style.setProperty('display', 'none'); 
    }
  }

  gameOverFunc() {
    this.modal.classList.toggle('active');
    if (this.gameOver.style.display !== 'block') {
      this.gameOver.style.setProperty('display', 'block');
    } else {
      this.gameOver.style.setProperty('display', 'none');
    }
  }

  setGameOver() {
    this.isGameOver = true;
  }
}
