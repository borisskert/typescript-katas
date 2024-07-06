/**
 * https://www.codewars.com/kata/58db9545facc51e3db00000a/train/typescript
 */
export function compress (stream: number[]): string {
  return Music.from(stream)
    .compress()
    .map((item: Compressible) => item.format())
    .join(',')
}

class Music {
  private readonly values: List<number>

  private constructor (values: List<number>) {
    this.values = values
  }

  compress (): List<Compressible> {
    return compressAll(this.values)
  }

  static from (music: number[]): Music {
    return new Music(List.from(music))
  }
}

const compressAll = (music: List<number>, compressed: List<Compressible> = List.empty()): List<Compressible> => {
  if (music.size() === 0) {
    return compressed
  }

  if (compressed.size() > 0) {
    const lastCompressed = compressed.last()
    const value = music.head()

    if (lastCompressed.accept(value)) {
      return compressAll(
        music.tail(),
        compressed.init().appendOne(lastCompressed.append(value))
      )
    }
  }

  const compressedOne = compressToOne(music)
  return compressAll(music.drop(compressedOne.length()), compressed.appendOne(compressedOne))
}

const compressToOne = (music: List<number>): Compressible => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [
    Identical.tryCreateFrom3,
    SameInterval.tryCreateFrom,
    Identical.tryCreateFrom2,
    Simple.createFrom,
  ].map(tryCreateFrom => tryCreateFrom(music))
    .filter(x => x !== undefined)[0]!
}

interface Compressible {
  append: (item: number) => Compressible

  accept: (another: number) => boolean

  format: () => string

  length: () => number
}

class Identical implements Compressible {
  private readonly items: List<number>

  constructor (items: List<number>) {
    this.items = items
  }

  append (item: number): Compressible {
    return new Identical(this.items.appendOne(item))
  }

  accept (another: number): boolean {
    const item = this.items.head()
    return item === another
  }

  format (): string {
    const item = this.items.head()
    return `${item}*${this.items.size()}`
  }

  length (): number {
    return this.items.size()
  }

  static tryCreateFrom3 (music: List<number>): Compressible | undefined {
    const start = music.take(3)

    if (Identical.allow(start)) {
      return new Identical(start)
    }
  }

  static tryCreateFrom2 (music: List<number>): Compressible | undefined {
    const start = music.take(2)

    if (Identical.allow(start)) {
      return new Identical(start)
    }
  }

  static allow (items: List<number>): boolean {
    const sorted = items.sorted((a, b) => a - b)

    return (items.size() === 2 || items.size() === 3) &&
      sorted.head() === sorted.last()
  }
}

class SameInterval {
  private readonly items: List<number>
  private readonly interval: number

  constructor (items: List<number>, interval: number) {
    this.items = items
    this.interval = interval
  }

  append (another: number): Compressible {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.interval === undefined) {
      const item = this.items.head()
      return new SameInterval(this.items.appendOne(another), another - item)
    }

    return new SameInterval(this.items.appendOne(another), this.interval)
  }

  accept (another: number): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.interval === undefined) {
      const item = this.items.head()
      return Math.abs(another - item) > 0
    }

    const last = this.items.last()
    return (last + this.interval) === another
  }

  format (): string {
    const head = this.items.head()
    const last = this.items.last()

    if (Math.abs(this.interval) === 1) {
      return `${head}-${last}`
    }

    return `${head}-${last}/${Math.abs(this.interval)}`
  }

  length (): number {
    return this.items.size()
  }

  static tryCreateFrom (music: List<number>): Compressible | undefined {
    const start = music.take(3)

    if (SameInterval.allow(start)) {
      return new SameInterval(start, start.tail().head() - start.head())
    }
  }

  private static allow (items: List<number>): boolean {
    const diffs = items.divvy(2, 1)
      .map(([first, second]) => second - first)
      .sorted()

    return items.size() === 3 &&
      diffs.head() === diffs.last()
  }
}

class Simple implements Compressible {
  private readonly item: number

  constructor (item: number) {
    this.item = item
  }

  accept (): boolean {
    return false
  }

  format (): string {
    return `${this.item}`
  }

  length (): number {
    return 1
  }

  append (item: number): Compressible {
    throw new Error('Not possible')
  }

  static createFrom (music: List<number>): Compressible {
    return new Simple(music.head())
  }
}

class List<T> {
  private static readonly EMPTY = new List([])

  private readonly items: T[]

  private constructor (items: T[]) {
    this.items = items
  }

  size (): number {
    return this.items.length
  }

  head (): T {
    return this.items[0]
  }

  last (): T {
    return this.items[this.items.length - 1]
  }

  init (): List<T> {
    const items = this.items.slice(0, this.items.length - 1)
    return new List<T>(items)
  }

  tail (): List<T> {
    const items = this.items.slice(1)
    return new List<T>(items)
  }

  take (n: number): List<T> {
    const items = this.items.slice(0, n)
    return new List<T>(items)
  }

  drop (n: number): List<T> {
    return new List<T>(this.items.slice(n))
  }

  map<U> (callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: never): List<U> {
    const mapped = this.items.map(callbackfn, thisArg)
    return List.from(mapped)
  }

  filter (predicate: (value: T, index: number) => unknown): List<T> {
    const items = this.items.filter((item, index) => predicate(item, index))
    return new List<T>(items)
  }

  /**
   * Divides up an input list into a set of sublists, according to {@param n} and {@param m} input specifications
   * you provide. Each sublist will have {@param n} items, and the start of each sublist will be offset by {@param m}
   * items from the previous one.
   * @param n the sublist size
   * @param m the sublist offset
   */
  public divvy (n: number, m: number): List<T[]> {
    if (this.items.length < n) {
      return List.EMPTY
    }

    const items = this.items.slice(0, n)
    const remaining = this.items.slice(m)
    const further = List.from(remaining).divvy(n, m)

    return List.of(items).appendAll(further)
  }

  appendAll (other: List<T>): List<T> {
    const items = [...this.items, ...other.items]
    return List.from(items)
  }

  appendOne (another: T): List<T> {
    const items = [...this.items, another]
    return new List<T>(items)
  }

  sorted (compareFn?: (a: T, b: T) => number): List<T> {
    const items = this.items.sort(compareFn)
    return new List<T>([...items])
  }

  join (separator: string): string {
    return this.items.join(separator)
  }

  public static of<T> (item: T): List<T> {
    return new List<T>([item])
  }

  public static from<T> (items: T[]): List<T> {
    return new List<T>([...items])
  }

  static empty<T> (): List<T> {
    return this.EMPTY
  }
}
