/**
 * https://www.codewars.com/kata/55084d3898b323f0aa000546/train/typescript
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class G964 {
  public static encodeStr = (cleartext: string, shift: number): string[] => {
    const ciphertext = caesars.encrypt(cleartext, shift)
    const { text } = prefix.forEncryption(cleartext, shift)

    return toChunks(text + ciphertext)
  }

  public static decode = (chunks: string[]): string => {
    const ciphertext = chunks.join('')
    const { shift } = prefix.forDecryption(ciphertext)

    return caesars.decrypt(ciphertext.slice(2), shift)
  }
}

interface Prefix {
  text: string
  shift: number
}

const prefix = {
  forEncryption: (cleartext: string, shift: number): Prefix => {
    const first: string = cleartext.charAt(0).toLowerCase()
    const second = caesars.encrypt(first, shift)

    return {
      text: first + second,
      shift,
    }
  },
  forDecryption: (ciphertext: string): Prefix => {
    const one = ciphertext.charAt(0)
    const two = ciphertext.charAt(1)
    const shift = caesars.shiftBetween(one, two)

    return {
      text: one + two,
      shift,
    }
  },
}

const toChunks = (text: string): string[] => {
  const chunkSize = Math.ceil(text.length / 5)

  function sliceIntoChunks (text: string): string[] {
    if (text.length <= chunkSize) {
      return [text]
    }

    const chunk = text.slice(0, chunkSize)
    const remaining = text.slice(chunkSize)

    return [chunk, ...sliceIntoChunks(remaining)]
  }

  return sliceIntoChunks(text)
}

const caesars = {
  alphabetSize: 26,
  encrypt: (cleartext: string, shift: number): string => {
    return cleartext.split('')
      .map(caesars.move(shift))
      .join('')
  },
  decrypt: (ciphertext: string, shift: number): string => {
    return ciphertext.split('')
      .map(caesars.move(shift * -1))
      .join('')
  },
  move: (shift: number) => {
    return function (char: string) {
      let offset

      if (char >= 'a' && char <= 'z') {
        offset = 'a'.charCodeAt(0)
      } else if (char >= 'A' && char <= 'Z') {
        offset = 'A'.charCodeAt(0)
      } else {
        return char
      }

      const code = char.charCodeAt(0)
      const shiftedCode = ((code - offset + shift + caesars.alphabetSize) % caesars.alphabetSize) + offset

      return String.fromCharCode(shiftedCode)
    }
  },
  shiftBetween: (first: string, second: string): number => {
    const one = first.charCodeAt(0)
    const two = second.charCodeAt(0)

    return (two - one + caesars.alphabetSize) % caesars.alphabetSize
  },
}
