/**
 * https://www.codewars.com/kata/555624b601231dc7a400017a/train/typescript
 */
export function josephusSurvivor (n: number, k: number): number {
  return intRange(1, n)
    .reduce((x, ni) => (x + k - 1) % ni + 1)
}

const intRange = (start: number, end: number): number[] => {
  const n = end - start + 1

  return Array.from(Array(n).keys())
    .map(x => x + start)
}
