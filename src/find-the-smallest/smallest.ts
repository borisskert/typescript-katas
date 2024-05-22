/**
 * https://www.codewars.com/kata/573992c724fc289553000e95/train/typescript
 */
export function smallest (n: number): number[] {
  return Result.potentialResults(n)
    .reduce(Result.min)
    .toArray()
}

class Result {
  private constructor (
    private readonly value: number,
    private readonly i: number,
    private readonly j: number
  ) {}

  toArray (): number[] {
    return [this.value, this.i, this.j]
  }

  static potentialResults (n: number): Result[] {
    const size = n.toString().length

    return cartesianProduct(size)
      .map(({ i, j }) => {
        const value = moveDigit(n, i, j)
        return new Result(value, i, j)
      })
  }

  static min (a: Result, b: Result): Result {
    return a.value <= b.value ? a : b
  }
}

function cartesianProduct (a: number, b: number = a): Array<{ i: number, j: number }> {
  return intRange(0, a)
    .flatMap(i =>
      intRange(0, b)
        .map(j => ({ i, j }))
    )
}

function intRange (start: number, end: number): number[] {
  const n = end - start + 1

  return Array.from(Array(n).keys())
    .map(x => x + start)
}

function moveDigit (n: number, i: number, j: number): number {
  const digits = n.toString().split('')

  const digit = digits.splice(i, 1)[0]
  digits.splice(j, 0, digit)

  return Number(digits.join(''))
}
