import Straight from './tetriminos/straight';
import Square from './tetriminos/square';
import T from './tetriminos/t';
import J from './tetriminos/j';
import L from './tetriminos/l';
import S from './tetriminos/s';
import Z from './tetriminos/z';

export default class PieceManager {
  constructor(board) {
    this.board = board;
    this.current = this.randomPiece();
    this.dropCount = 0;
    this.hold = null;
    this.holdCount = 0;
    this.next = [this.randomPiece(), this.randomPiece(), this.randomPiece()];
  }

  static pieces = [Straight, Square, T, J, L, S, Z];

  randomPiece() {
    const rand = Math.floor(Math.random() * PieceManager.pieces.length);
    return new PieceManager.pieces[rand](this.board);
  }

  createPiece() {
    this.current = this.randomPiece();
    if (!this.current.isValidPositions()) {
      this.current.y -= 1;
    }
    if (!this.current.isValidPositions()) {
      this.current = null;
    }
  }

  move() {
    if (this.dropCount === 60) {
      let tetriminoPlaced = this.current.drop();
      if (tetriminoPlaced) {
        this.createPiece();
        this.holdCount = 0;
        if (this.current === null) {
          return true;
        }
      }
      this.dropCount = 0;
    }
    this.dropCount += 1;
    return false;
  }

  draw(ctx, holdCtx, nextCtx, sideBlockSize) {
    if (this.current) {
      this.current.draw(ctx);
    }
    this.drawHoldContainer(holdCtx, sideBlockSize);
    if (this.hold) {
      this.hold.drawBlock(holdCtx, 0, sideBlockSize);
    }
  }

  drawHoldContainer(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 150, 150);
  }

  holdTetrimino() {
    if (this.holdCount === 0) {
      if (this.hold === null) {
        this.hold = this.current;
        this.createPiece();
      } else {
        const temp = this.current;
        this.current = this.hold;
        this.hold = temp;
      }
      this.holdCount += 1;
    }
  }

  moveLeft() {
    this.current.moveLeft();
  }

  moveRight() {
    this.current.moveRight();
  }

  softDrop() {
    this.current.softDrop();
  }

  rotateRight() {
    this.current.rotateRight();
  }

  rotateLeft() {
    this.current.rotateLeft();
  }
}
