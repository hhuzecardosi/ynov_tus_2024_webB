class Board {
    _aliveCells = new Set<string>();

    constructor(public generation: number, public boardAsStr: string, readonly nbLines: number, readonly nbColumns: number) {

    }

    setAliveCellAt(x: number, y: number) {
        this._aliveCells.add(`${x};${y}`);
    }

    isCellAliveAt(x: number, y: number): boolean {
        return this._aliveCells.has(`${x};${y}`);
    }

    nextTurn() {
        ++this.generation;

        const newAliveCells = new Set<string>();
        for (let x = 1; x <= this.nbLines; x++) {
            for (let y = 1; y <= this.nbColumns; y++) {
                const nbNeighbors = this.countNeighbors(x, y);
                if (this.isCellAliveAt(x, y)) {
                    if (nbNeighbors === 2 || nbNeighbors === 3) {
                        newAliveCells.add(`${x};${y}`);
                    }
                }
            }
        }

        this._aliveCells = newAliveCells;
    }

    private countNeighbors(x: number, y: number): number {
        let neighbors = 0;
        if (this.isCellAliveAt(x - 1, y - 1)) neighbors++;
        if (this.isCellAliveAt(x - 1, y)) neighbors++;
        if (this.isCellAliveAt(x - 1, y + 1)) neighbors++;
        if (this.isCellAliveAt(x, y - 1)) neighbors++;
        if (this.isCellAliveAt(x, y + 1)) neighbors++;
        if (this.isCellAliveAt(x + 1, y - 1)) neighbors++;
        if (this.isCellAliveAt(x + 1, y)) neighbors++;
        if (this.isCellAliveAt(x + 1, y + 1)) neighbors++;

        return neighbors
    }
}

class BoardMapper {
    static FromString(str: string): Board {
        const [generationLine, boardDimensions, ...lines] = str.split('\n');
        const generation = parseInt(generationLine.match(/Generation (\d+):/)?.[1] ?? '0');
        const [nbLines, nbColumns] = boardDimensions.split(' ');
        const board = new Board(generation, str, parseInt(nbLines), parseInt(nbColumns));

        for (let x = 0; x < board.nbLines; x++) {
            for (let y = 0; y < board.nbColumns; y++) {
                if (lines[x][y] === '*') {
                    board.setAliveCellAt(x + 1, y + 1);
                }
            }
        }

        return board;
    }

    static ToString(board: Board): string {
        return `Generation ${board.generation}:\n${board.nbLines} ${board.nbColumns}\n${BoardMapper.EncodeLines(board)}`;
    }

    private static EncodeLines(board: Board): string {
        let result = '';
        for (let x = 1; x <= board.nbLines; x++) {
            for (let y = 1; y <= board.nbColumns; y++) {
                if (board.isCellAliveAt(x, y)) {
                    result += '*';
                } else {
                    result += '.';
                }
            }
            result += `\n`;
        }
        return result.substring(0, result.length - 1);
    }
}

// The only visible class from the outside
export class GameOfLife {
    private constructor(private readonly board: Board) {

    }

    static FromString(str: string): GameOfLife {
        return new GameOfLife(BoardMapper.FromString(str));
    }

    toString(): string {
        return BoardMapper.ToString(this.board);
    }

    nextTurn(): void {
        this.board.nextTurn();
    }
}
