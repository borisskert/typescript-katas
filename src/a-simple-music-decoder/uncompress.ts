/**
 * https://www.codewars.com/kata/58de42bab4b74c214d0000e2/train/typescript
 */
export function uncompress (music: string): number[] {
  return music.split(',')
    .flatMap(value => inflate(value))
}

function inflate (compressed: string): number[] {
  const found = [
    sameInterval(compressed),
    identical(compressed),
    simple(compressed),
  ].find(v => v.accept())

  if (found === undefined) {
    throw Error(`Cannot handle: ${compressed}`)
  }

  return found.inflate()
}

interface Inflatable {
  accept: () => boolean
  inflate: () => number[]
}

function sameInterval (compressed: string): Inflatable {
  const regexp = /^(-?\d+)-(-?\d+)(\/(\d+))?$/
  const DEFAULT_STEP = 1

  const groups = regexp.exec(compressed) as string[]

  return {
    accept: () => groups !== null,
    inflate: () => {
      const [, first, second, , third] = groups
      const begin = Number.parseInt(first)
      const end = Number.parseInt(second)
      const sign = signum(end - begin)

      const step = (third !== undefined ? Number.parseInt(third) : DEFAULT_STEP) * sign

      return range(
        begin,
        (a: number) => a !== end,
        (a: number) => a + step)
    },
  }
}

function identical (compressed: string): Inflatable {
  const regexp = /^(-?\d+)\*(\d+)$/

  const groups = regexp.exec(compressed) as string[]

  return {
    accept: () => groups !== null,
    inflate: () => {
      const [, first, second] = groups
      const value = Number.parseInt(first)
      const count = Number.parseInt(second)

      return arrayOf(value, count)
    },
  }
}

function simple (compressed: string): Inflatable {
  const regexp = /^(-?\d+)$/

  const groups = regexp.exec(compressed) as string[]

  return {
    accept: () => groups !== null,
    inflate: () => {
      const [, first] = groups
      const value = Number.parseInt(first)

      return [value]
    },
  }
}

/**
 * Creates a number array starting from specified `start` value. The `hasNext` predicate will terminate the array when applying to false
 * @param start the starting value
 * @param hasNext the predicate to check if the end of the array has been reached
 * @param next function to produce the next element
 * @returns a number array
 */
function range (start: number, hasNext: (a: number) => boolean, next: (a: number) => number): number[] {
  if (!hasNext(start)) {
    return [start]
  }

  return [start, ...range(next(start), hasNext, next)]
}

/**
 * Creates a `n`-sized array containing `value`
 * @param value the only value
 * @param n the array size as number
 * @returns an array
 */
function arrayOf<T> (value: T, n: number): T[] {
  if (n <= 0) return []
  return [value, ...arrayOf(value, n - 1)]
}

/**
 * Determine the sign of a number as number value:
 * - `+1` for positive numbers
 * - `-1` for negative numbers
 * - `0` for zero
 * @param x the number to test
 * @returns `+1`, `-1` or `0`
 */
function signum (x: number): number {
  if (x > 0) {
    return 1
  }

  if (x < 0) {
    return -1
  }

  return 0
}
