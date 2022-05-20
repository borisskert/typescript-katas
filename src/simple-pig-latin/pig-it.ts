/*
 * https://www.codewars.com/kata/520b9d2ad5c005041100000f/train/typescript
 */

const WORD_SEPARATOR = ' '
const CHAR_SEPARATOR = ''

export const pigIt = (sentence: string): string => {
  return sentence.split(WORD_SEPARATOR)
    .map(toPig)
    .join(WORD_SEPARATOR)
}

const toPig = (word: string): string => {
  if (word.length < 1) {
    return word
  }

  if (hasPunctuation(word)) {
    return word
  }

  const [head, ...tail] = word.split(CHAR_SEPARATOR)
  return [...tail, head, 'a', 'y'].join(CHAR_SEPARATOR)
}

const punctuations = ['!', '?', '.']

const hasPunctuation = (word: string): boolean => {
  return punctuations.find(punctuation => word.includes(punctuation)) !== undefined
}
