/**
 * https://www.codewars.com/kata/55c6126177c9441a570000cc/train/typescript
 */
export function orderWeight (strng: string): string {
  return strng.split(' ')
    .map(string => Weight.from(string))
    .sort(Weight.compare)
    .map(weight => weight.toString())
    .join(' ')
}

class Weight {
  private readonly raw: string
  private readonly crossSum: number

  private constructor (raw: string, crossSum: number) {
    this.raw = raw
    this.crossSum = crossSum
  }

  toString (): string {
    return this.raw
  }

  static compare (a: Weight, b: Weight): number {
    if (a.crossSum === b.crossSum) {
      return a.raw.localeCompare(b.raw)
    }

    return a.crossSum - b.crossSum
  }

  static from (weight: string): Weight {
    const crossSum: number = weight.split('')
      .map(c => Number.parseInt(c, 10))
      .reduce((a, b) => a + b, 0)

    return new Weight(weight, crossSum)
  }
}
