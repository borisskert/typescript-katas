/**
 * https://www.codewars.com/kata/58223370aef9fc03fd000071/train/typescript
 */
export function dashatize (num: number): string {
  if (isNaN(num)) {
    return 'NaN'
  }

  if (num < 0) {
    return dashatize(-num)
  }

  const digits = num
    .toString()
    .split('')
    .map(Number)

  const groups = splitBy(digits, (a, b) => {
    return isOdd(a) || isOdd(b)
  })

  return groups
    .map(group => group.join(''))
    .join('-')
}

function isOdd (num: number): boolean {
  return num % 2 === 1
}

function splitBy<T> (array: T[], predicate: (a: T, b: T) => boolean): T[][] {
  const splitBetween = (groups: T[][], value: T, i: number): T[][] => {
    if (i === 0 || !predicate(array[i - 1], value)) {
      let group = groups[groups.length - 1]

      if (group === undefined) {
        group = []
        groups.push(group)
      }

      group.push(value)
    } else {
      groups.push([value])
    }

    return groups
  }

  return array.reduce(splitBetween, [])
}
