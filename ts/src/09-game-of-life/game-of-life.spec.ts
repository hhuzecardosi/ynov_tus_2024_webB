import {GameOfLife} from "./game-of-life";


describe('Game of Life', () => {

  let gameOfLife: GameOfLife;

  it('should create a game of life', () => {
    gameOfLife = new GameOfLife('');
    expect(gameOfLife).toBeDefined();
  });

  it('should return board from input string', () => {
    const stringBoard = '........\n........\n........\n........\n';
    gameOfLife = new GameOfLife(stringBoard);
    expect(gameOfLife.getBoard()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]);
  });

  it('should have a living cell', () => {
    const stringBoard = '........\n........\n........\n.......*\n';
    gameOfLife = new GameOfLife(stringBoard);
    expect(gameOfLife.getBoard()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1]]);
  });

  it('should kill a cell if it has less than 2 neighbors', () => {
    const stringBoard = '........\n........\n...*....\n........\n';
    gameOfLife = new GameOfLife(stringBoard);
    gameOfLife.nextTurn();
    expect(gameOfLife.getBoard()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]);
  });

  it('should kill a cell if it has 2 neighbors', () => {
    const stringBoard = '........\n.......\n..**....\n........\n';
    gameOfLife = new GameOfLife(stringBoard);
    gameOfLife.nextTurn();
    expect(gameOfLife.getBoard()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]);
  });

  it('should s', () => {
  });
});
