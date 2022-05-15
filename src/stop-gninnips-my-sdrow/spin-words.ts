/**
 * https://www.codewars.com/kata/5264d2b162488dc400000001/train/typescript
 */
export function spinWords (words: string): string {
  return words.split(' ')
    .map(word => {
      return word.length >= 5 ? reverse(word) : word
    }).join(' ')
}

function reverse (string: string): string {
  return string.split('')
    .reverse()
    .join('')
}
