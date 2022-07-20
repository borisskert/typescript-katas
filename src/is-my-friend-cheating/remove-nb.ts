/*
 * https://www.codewars.com/kata/5547cc7dcad755e480000004/train/typescript
 */
import { intRange } from './stream'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class G964 {
  public static removeNb (n: number): number[][] {
    const sumN: number = gauss(n)

    return intRange(1, n - 1)
      .map((a) => ({ a, b: Math.floor((sumN - a) / a) }))
      .filter(({ a, b }) => a * b === sumN - a - b)
      .flatMap(({ a, b }) => ([[a, b], [b, a]]))
      .sorted(comparingFirst)
      .toArray()
  }
}

const comparingFirst = ([a]: number[], [b]: number[]): number => a - b

function gauss (n: number): number {
  return n * (n + 1) / 2
}
