/**
 * https://www.codewars.com/kata/5547cc7dcad755e480000004/train/typescript
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class G964 {
  public static removeNb (n: number): number[][] {
    const sumN: number = gauss(n)
    let numbers: number[][] = []

    for (let a: number = 1; a < n; a += 1) {
      const b = Math.floor((sumN - a) / a)

      if (a * b === sumN - a - b) {
        numbers = [...numbers, [a, b], [b, a]]
      }
    }

    return numbers.sort(comparingFirst)
  }
}

const comparingFirst = ([a]: number[], [b]: number[]): number => a - b

function gauss (n: number): number {
  return n * (n + 1) / 2
}
