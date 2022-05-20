// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class G964 {
  /**
   * https://www.codewars.com/kata/5536a85b6ed4ee5a78000035/train/typescript
   */
  public static tour = (friendsArr: string[], fTowns: string[][], distTable: Array<string | number>): number => {
    const friends: List<string> = List.from(friendsArr)
    const friendTowns: Dictionary<string> = Dictionary.fromTwoDimArray(fTowns)
    const townDistances: Dictionary<number> = Dictionary.fromOneDimArray(distTable)

    const distances: List<number> = friends
      .mapNotNull(friend => friendTowns.get(friend))
      .mapNotNull(town => townDistances.get(town))

    const distance: number = distances.zipWithNext()
      .map(({ first: a, last: c }) => oppositeLeg(a, c))
      .reduce((a, b) => a + b, 0)

    return Math.floor(distance + distances.head() + distances.last())
  }
}

class Dictionary<V> {
  private readonly dictionary: { [key: string]: V }

  private constructor (dictionary: { [key: string]: V }) {
    this.dictionary = dictionary
  }

  public get (key: string): V {
    return this.dictionary[key]
  }

  public static fromTwoDimArray<V> (array: string[][]): Dictionary<V> {
    const dictionary = array.reduce((obj: {}, pair: string[]) => {
      const key = pair[0]
      const value = pair[1]

      return {
        ...obj,
        [key]: value,
      }
    }, {})

    return new Dictionary(dictionary)
  }

  public static fromOneDimArray<V> (distTable: Array<string | number>): Dictionary<V> {
    const array = List.from(distTable)
      .toPairs(a => a.toString())
      .toArray()

    // @ts-expect-error
    const dictionary: { [key: string]: V } = Dictionary.toDictionary(array)

    return new Dictionary(dictionary)
  }

  private static toDictionary<T> (array: Array<Pair<string, T>>): { [key: string]: number } {
    return array.reduce((obj: {}, { first, last }) => {
      return {
        ...obj,
        [first]: last,
      }
    }, {})
  }
}

class List<T> {
  private static readonly EMPTY = new List([])

  private readonly items: T[]

  private constructor (items: T[]) {
    this.items = items
  }

  public zipWithNext (): List<Pair<T, T>> {
    return this.divvy(2, 1)
      .map(([first, last]) => ({ first, last }))
  }

  // @ts-expect-error
  public toPairs<F, L> (toFirst: (T) => F = (a) => a, toLast: (T) => L = (a) => a): List<Pair<F, L>> {
    return this.divvy(2, 2)
      .map(([first, last]) => ({ first: toFirst(first), last: toLast(last) }))
  }

  public head (): T {
    return this.items[0]
  }

  public last (): T {
    return this.items[this.items.length - 1]
  }

  public map<U> (callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): List<U> {
    const mapped = this.items.map(callbackfn, thisArg)
    return List.from(mapped)
  }

  public mapNotNull<U> (callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): List<U> {
    const mapped = this.items.map(callbackfn, thisArg)
      .filter(item => item !== null && item !== undefined)
    return List.from(mapped)
  }

  public reduce (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T {
    return this.items.reduce(callbackfn, initialValue)
  }

  /**
   * Divides up an input list into a set of sublists, according to {@param n} and {@param m} input specifications
   * you provide. Each sublist will have {@param n} items, and the start of each sublist will be offset by {@param m}
   * items from the previous one.
   * @param n the sublist size
   * @param m the sublist offset
   */
  private divvy (n: number, m: number): List<T[]> {
    if (this.items.length < n) {
      return List.EMPTY
    }

    const items = this.items.slice(0, n)
    const remaining = this.items.slice(m)
    const further = List.from(remaining).divvy(n, m)

    return List.of(items).append(further)
  }

  private append (other: List<T>): List<T> {
    const items = [...this.items, ...other.items]
    return List.from(items)
  }

  public static of<T> (item: T): List<T> {
    return new List<T>([item])
  }

  public static from<T> (items: T[]): List<T> {
    return new List<T>([...items])
  }

  public toArray (): T[] {
    return [...this.items]
  }
}

interface Pair<T, S> {
  first: T
  last: S
}

function oppositeLeg (a: number, c: number): number {
  return Math.sqrt(c * c - a * a)
}
