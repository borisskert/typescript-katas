/**
 * https://www.codewars.com/kata/550f22f4d758534c1100025a/train/typescript
 */
export function dirReduc (array: string[]): string[] {
  return array
    .map(Direction.from)
    .reduce((directions, direction) => {
      return directions.append(direction)
    }, Directions.empty())
    .toArray()
    .map(direction => direction.toString())
}

class Directions {
  private readonly directions: Direction[]

  private constructor (directions: Direction[]) {
    this.directions = directions
  }

  public append (direction: Direction): Directions {
    if (this.directions.length < 1) {
      return new Directions([direction])
    }

    if (this.last().isOppositeOf(direction)) {
      return this.init()
    }

    return new Directions([...this.directions, direction])
  }

  private last (): Direction {
    return this.directions[this.directions.length - 1]
  }

  private init (): Directions {
    const init = this.directions.slice(0, this.directions.length - 1)
    return new Directions(init)
  }

  public static empty (): Directions {
    return new Directions([])
  }

  toArray (): Direction[] {
    return this.directions
  }
}

class Direction {
  private static readonly opposites: { [key: string]: string } = {
    NORTH: 'SOUTH',
    SOUTH: 'NORTH',
    EAST: 'WEST',
    WEST: 'EAST',
  }

  private readonly value: string

  private constructor (value: string) {
    this.value = value
  }

  public isOppositeOf (other: Direction): boolean {
    return Direction.opposites[this.value] === other.value
  }

  public toString (): string {
    return this.value
  }

  public static from (direction: string): Direction {
    return new Direction(direction)
  }
}
