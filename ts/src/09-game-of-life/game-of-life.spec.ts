class GameOfLife {
    private constructor (private readonly str: string) {

    }

    static FromString(str: string): GameOfLife {
        return new GameOfLife(str);
    }

    toString(): string {
        return this.str;
    }

    nextTurn(): void {
        // TODO : Implement
    }
}

describe('Game of life kata', () => {
    it('should return the same grid as initial if nextTurn is not invoked', () => {
        const initialBoard = new BoardHelper(1, 2, 3).withLine('...').withLine('...').build();
        const gameOfLife = GameOfLife.FromString(initialBoard);
        expect(gameOfLife.toString()).toBe(initialBoard);
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

    // Possible simpler case : next turn on empty grid bumps generation.
});

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
