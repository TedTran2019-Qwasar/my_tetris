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
      let result = this.current.drop();
      if (result) {
        this.createPiece();
        if (this.current === null) {
          return true;
        }
      }
      this.dropCount = 0;
    }
    this.dropCount += 1;
    return false;
  }

  draw(ctx) {
    if (this.current) {
      this.current.draw(ctx);
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
