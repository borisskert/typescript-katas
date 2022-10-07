/**
 * https://www.codewars.com/kata/56a5d994ac971f1ac500003e/train/typescript
 */
export function longestConsec (strarr: string[], k: number): string {
  const consecutives = divvy(strarr, k, 1)
    .map(x => concat(x))
    .sort((a, b) => b.length - a.length)

  return consecutives.length > 0 ? consecutives[0] : ''
}

/**
 * Divides up an input list into a set of sublists, according to {@param n} and {@param m} input specifications
 * you provide. Each sublist will have {@param n} items, and the start of each sublist will be offset by {@param m}
 * items from the previous one.
 * @param array the array to be split
 * @param n the sublist size
 * @param m the sublist offset
 */
export function divvy<T> (array: T[], n: number, m: number): T[][] {
  if (n <= 0) {
    return []
  }

  if (m <= 0) {
    return [array.slice(0, n)]
  }

  let remaining: T[] = array
  let items: T[][] = []

  while (remaining.length >= n) {
    items = [...items, remaining.slice(0, n)]
    remaining = remaining.slice(m)
  }

  return items
}

function concat (strings: string[]): string {
  return strings.reduce((a, b) => a + b, '')
}
