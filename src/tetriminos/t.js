import Tetrimino from './tetrimino';

export default class T extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    this.color = 'purple';
    this.x = 3;
    this.y = 17;
  }
}
