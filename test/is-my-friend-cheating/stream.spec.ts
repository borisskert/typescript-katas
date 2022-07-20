import { assert } from 'chai'
import { fromArray, intRange } from '../../src/is-my-friend-cheating/stream'

function descending (a: number, b: number): number {
  return b - a
}

describe('Stream tests', function () {
  it('should create intstream', function () {
    const numberStream = intRange(1, 5)
    assert.deepEqual(numberStream.toArray(), [1, 2, 3, 4, 5])
    assert.deepEqual(numberStream.filter((x: number) => x % 2 === 0).toArray(), [2, 4])

    const duplicateValues = numberStream.map((x: number) => x * 2)

    assert.deepEqual(duplicateValues.toArray(), [2, 4, 6, 8, 10])
    assert.deepEqual(duplicateValues.sorted(descending).toArray(), [10, 8, 6, 4, 2])
  })

  it('should create generic Stream and sort it', function () {
    assert.deepEqual(fromArray(['C', 'B', 'Z', 'R', 'A', 'G']).sorted().toArray(), ['A', 'B', 'C', 'G', 'R', 'Z'])
  })

  it('should flatmap a stream', function () {
    assert.deepEqual(
      fromArray([[2, 3], [1, 5], [], [7, 5], [10], [9, 5], [5, 7, 6]])
        .filter((a: number[]) => a.length === 2)
        .flatMap(([a, b]) => [a + b])
        .toArray(), [5, 6, 12, 14])
  })
})
