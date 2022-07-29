import Board from './board';
import PieceManager from './pieceManager';

export default class Game {
  constructor() {
   this.rows = Game.ROWS;
   this.cols = Game.COLS;
   this.dimX = Game.DIM_X;
   this.dimY = Game.DIM_Y;
   this.blockSize = Game.BLOCK_SIZE;
   this.board = new Board(this.cols, this.rows, this.blockSize);
   this.pieceManager = new PieceManager(this.board);
  }

  step() {
    let isGameOver = this.pieceManager.move();
    if (isGameOver) {return true };
    this.board.clearRows();
    return false;
  }

  draw(ctx, holdCtx, nextCtx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.board.draw(ctx);
    this.pieceManager.draw(ctx, holdCtx, nextCtx, Game.BLOCK_SIZE);
  }
}

Game.DIM_X = 450;
Game.DIM_Y = 900;
Game.ROWS = 40;
Game.COLS = 10;
Game.BLOCK_SIZE = 45;
Game.MOVE_SPEED = 1;
