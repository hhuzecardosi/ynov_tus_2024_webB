const ALIVE = 1;
const DEAD = 0;

export class GameOfLife {

  board: number[][];

  static fromString(gameOfLifeString: string): number[][] {
    const board: number[][] = [];
    const lines = gameOfLifeString.split('\n');
    for (let i = 0; i < lines.length -1; i++) {
      board[i] = [];
      for (let j = 0; j < lines[i].length; j++) {
        board[i][j] = lines[i][j] === '.' ? DEAD : ALIVE;
      }
    }
    return board;
  }

  constructor(gameOfLifeString: string) {
    this.board = GameOfLife.fromString(gameOfLifeString);
  }

  nextTurn(): void {
    const newBoard: number[][] = [];
    for (let i = 0; i < this.board.length; i++) {
      newBoard[i] = [];
      for (let j = 0; j < this.board[i].length; j++) {
        newBoard[i][j] = this.nextCellState(i, j)
      }
    }
    this.board = newBoard;
  }

  getBoard() {
    return this.board;
  }

  private nextCellState(i: number, j: number): number {



    return 0;
  }
}
