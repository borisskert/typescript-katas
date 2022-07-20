export interface Stream<T> {
  filter: (predicate: (value: T, index: number) => boolean) => Stream<T>
  map: <U>(callbackfn: (value: T, index: number) => U) => Stream<U>
  flatMap: <U>(callbackfn: (value: T, index: number) => U[]) => Stream<U>
  toArray: () => T[]
  sorted: (compareFn?: (a: T, b: T) => number) => Stream<T>
}

export function intRange (start: number, end: number, next: (x: number) => number = (x) => x + 1): Stream<number> {
  function* generate (): Iterator<number> {
    let x: number = start

    while (x <= end) {
      yield x
      x = next(x)
    }
  }

  return new IterableStream(generate)
}

export function fromArray<T> (items: T[]): Stream<T> {
  function* generate (): Iterator<T> {
    for (const item of items) {
      yield item
    }
  }

  return new IterableStream(generate)
}

class IterableStream<T> implements Stream<T> {
  private readonly iteratorFn: () => Iterator<T>

  constructor (iteratorFn: () => Iterator<T>) {
    this.iteratorFn = iteratorFn
  }

  filter (predicate: (value: T, index: number) => boolean): Stream<T> {
    return new Filtering(predicate, this).toStream()
  }

  map<U> (callbackfn: (value: T, index: number) => U): Stream<U> {
    return new Mapping(callbackfn, this).toStream()
  }

  flatMap<U> (callbackfn: (value: T, index: number) => U[]): Stream<U> {
    const mapped = new Mapping(callbackfn, this).toStream() as IterableStream<U[]>
    return new Flattening(mapped).toStream()
  }

  sorted (compareFn: ((a: T, b: T) => number) | undefined): Stream<T> {
    return new Sorting(compareFn, this).toStream()
  }

  * asIterator (): Iterator<T> {
    const iterator = this.iteratorFn()
    let next = iterator.next()

    while (next !== undefined && next.done === false) {
      const value = next.value

      yield value

      next = iterator.next()
    }
  }

  toArray (): T[] {
    let items: T[] = []
    const iterator = this.iteratorFn()
    let next = iterator.next()

    while (next !== undefined && next.done === false) {
      items = [...items, next.value]
      next = iterator.next()
    }

    return items
  }
}

class Mapping<T, U> {
  constructor (
    private readonly callbackfn: (value: T, index: number) => U,
    private readonly stream: IterableStream<T>
  ) {
  }

  private* asIterator (): Iterator<U> {
    let index = 0

    const iterator = this.stream.asIterator()
    let next = iterator.next()

    while (next !== undefined && next.done === false) {
      const value = next.value

      yield this.callbackfn(value, index)

      index += 1
      next = iterator.next()
    }
  }

  public toStream (): Stream<U> {
    return new IterableStream(() => this.asIterator())
  }
}

class Filtering<T> {
  constructor (
    private readonly predicate: (value: T, index: number) => boolean,
    private readonly stream: IterableStream<T>
  ) {
  }

  private* asIterator (): Iterator<T> {
    let index = 0

    const iterator = this.stream.asIterator()
    let next = iterator.next()

    while (next !== undefined && next.done === false) {
      const value = next.value

      if (this.predicate(value, index)) {
        yield value
      }

      index += 1
      next = iterator.next()
    }
  }

  public toStream (): Stream<T> {
    return new IterableStream(() => this.asIterator())
  }
}

class Flattening<T> {
  constructor (
    private readonly stream: IterableStream<T[]>
  ) {
  }

  private* flatten (): Iterator<T> {
    const iterator = this.stream.asIterator()
    let next = iterator.next()

    while (next !== undefined && next.done === false) {
      const value = next.value

      yield* value

      next = iterator.next()
    }
  }

  public toStream (): Stream<T> {
    return new IterableStream(() => this.flatten())
  }
}

class Sorting<T> {
  constructor (
    private readonly compareFn: ((a: T, b: T) => number) | undefined,
    private readonly stream: Stream<T>,
  ) {
  }

  private sorted (): T[] {
    const items: T[] = this.stream.toArray()
    return items.sort(this.compareFn)
  }

  public toStream (): Stream<T> {
    const sortedItems = this.sorted()
    return fromArray(sortedItems)
  }
}
