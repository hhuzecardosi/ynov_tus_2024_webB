import {GameOfLife} from "./game-of-life";


describe('Game of life kata', () => {
    it('should return the same grid as initial if nextTurn is not invoked', () => {
        const initialBoard = new BoardHelper(1, 2, 3).withLine('...').withLine('...').build();
        const gameOfLife = GameOfLife.FromString(initialBoard);
        expect(gameOfLife.toString()).toBe(initialBoard);
    });

    it('should bump the generation if nextTurn is invoked', () => {
        const initialBoard = new BoardHelper(2, 2, 3).withLine('...').withLine('...').build();
        const gameOfLife = GameOfLife.FromString(initialBoard);
        gameOfLife.nextTurn();

        expect(gameOfLife.toString()).toContain('Generation 3:');
    });

    it('should kill any cell that does not have 2 neighbors', () => {
        // ARRANGE
        const initialBoard = new BoardHelper(1, 2, 3).withLine('.**').withLine('...').build();

        // ACT
        const gameOfLife = GameOfLife.FromString(initialBoard);
        gameOfLife.nextTurn();

        // ASSERT
        const expectedBoard = new BoardHelper(2, 2, 3).withLine('...').withLine('...').build();
        expect(gameOfLife.toString()).toBe(expectedBoard);
    });

    it('should kill any cell that has 4 neighbors or more', () => {
        // ARRANGE
        const initialBoard = new BoardHelper(1, 3, 3)
            .withLine('.*.')
            .withLine('.*.')
            .withLine('***')
            .build();

        // ACT
        const gameOfLife = GameOfLife.FromString(initialBoard);
        gameOfLife.nextTurn();

        // ASSERT
        const expectedBoard = new BoardHelper(2, 3, 3)
            .withLine('???')
            .withLine('?.?')
            .withLine('???')
            .build();

        expectBoardToBe(gameOfLife.toString(), expectedBoard);
    });
});

/** Helper class to build a board */
class BoardHelper {
    private _lines: string[] = [];
    constructor(readonly generation: number, readonly nbLines: number, readonly nbColumns: number) {

    }

    withLine(str: string): BoardHelper {
        this._lines.push(str);
        return this;
    }

    build(): string {
        return `Generation ${this.generation}:\n${this.nbLines} ${this.nbColumns}\n${this._lines.join('\n')}`
    }
}

// Helper function to compare two boards => Output
function expectBoardToBe(actualBoard: string, expectedBoard: string) {
    const errors = [];
    const [actualGenerationLine, actualDimensionsLine, ...actualBoardLines] = actualBoard.split('\n');
    const [expectedGenerationLine, expectedDimensionsLine, ...expectedBoardLines] = expectedBoard.split('\n');

    expect(actualGenerationLine).toBe(expectedGenerationLine);
    expect(actualDimensionsLine).toBe(expectedDimensionsLine);

    const [nbLines, nbCols] = expectedDimensionsLine.split(' ');

    for (let x = 0; x < parseInt(nbLines); x++) {
        for (let y = 0; y < parseInt(nbCols); y++) {
            if (expectedBoardLines[x][y] === '?') {
                continue;
            }
            if (actualBoardLines[x][y] !== expectedBoardLines[x][y]) {
                errors.push(`Expected ${expectedBoardLines[x][y]} at ${x},${y} but got ${actualBoardLines[x][y]}`);
            }
        }
    }
    expect(errors).toEqual([]);
}
