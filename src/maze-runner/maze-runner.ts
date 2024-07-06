/**
 * https://www.codewars.com/kata/58663693b359c4a6560001d6/train/typescript
 */
export function mazeRunner (grid: number[][], directions: string[]): string {
  const maze = Maze.from(grid)

  function run (position: Position, directions: string[]): string {
    if (directions.length < 1) {
      return 'Lost'
    }

    const [direction, ...furtherDirections] = directions
    const newPosition = Move.from(position).to(direction)
    const field: Field = maze.at(newPosition)

    if (field === Field.WALL) {
      return 'Dead'
    } else if (field === Field.FINISH) {
      return 'Finish'
    }

    return run(newPosition, furtherDirections)
  }

  return run(maze.startPosition(), directions)
}

enum Field {
  WALL = 1,
  START = 2,
  FINISH = 3,
}

interface Position {
  x: number
  y: number
}

class Maze {
  private readonly grid: Field[][]
  private readonly start: Position

  private constructor (grid: Field[][], start: Position) {
    this.grid = grid
    this.start = start
  }

  startPosition (): Position {
    return this.start
  }

  at (position: Position): Field {
    const line: Field[] | undefined = this.grid[position.y]
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const field = line === undefined ? Field.WALL : line[position.x]

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return field ?? Field.WALL
  }

  static from (grid: Field[][]): Maze {
    const start = this.findStart(grid)
    return new Maze(grid, start)
  }

  private static findStart (grid: Field[][]): Position {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === Field.START) {
          return { x, y }
        }
      }
    }

    throw new Error('Cannot find start')
  }
}

class Move {
  private readonly position: Position

  private constructor (position: Position) {
    this.position = position
  }

  to (direction: string): Position {
    const { x, y } = this.position

    switch (direction) {
      case 'N':
        return { x, y: y - 1 }
      case 'S':
        return { x, y: y + 1 }
      case 'E':
        return { x: x + 1, y }
      case 'W':
        return { x: x - 1, y }
    }

    throw new Error('Undefined direction')
  }

  static from (position: Position): Move {
    return new Move(position)
  }
}
