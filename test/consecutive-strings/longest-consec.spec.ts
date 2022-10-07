import { assert } from 'chai'
import { divvy, longestConsec } from '../../src/consecutive-strings/longest-consec'

describe('Fixed Tests', function () {
  it('Basic tests longestConsec', function () {
    assert.strictEqual(longestConsec(['zone', 'abigail', 'theta', 'form', 'libe', 'zas'], 2), 'abigailtheta')
    assert.strictEqual(longestConsec(['ejjjjmmtthh', 'zxxuueeg', 'aanlljrrrxx', 'dqqqaaabbb', 'oocccffuucccjjjkkkjyyyeehh'], 1), 'oocccffuucccjjjkkkjyyyeehh')
    assert.strictEqual(longestConsec(['it', 'wkppv', 'ixoyx', '3452', 'zzzzzzzzzzzz'], 3), 'ixoyx3452zzzzzzzzzzzz')
    assert.strictEqual(longestConsec([], 3), '')
    assert.strictEqual(longestConsec(['zone', 'abigail', 'theta', 'form', 'libe', 'zas'], -2), '')
  })

  it('should divvy', function () {
    assert.deepEqual(divvy(['a', 'b', 'c'], 2, 1), [['a', 'b'], ['b', 'c']])
    assert.deepEqual(divvy([], 2, 1), [])
    assert.deepEqual(divvy(['a'], 2, 1), [])
    assert.deepEqual(divvy(['a', 'b', 'c'], 2, 0), [['a', 'b']])
    assert.deepEqual(divvy(['a', 'b', 'c'], 3, 1), [['a', 'b', 'c']])
    assert.deepEqual(divvy(['a', 'b', 'c'], 4, 1), [])
    assert.deepEqual(divvy(['a', 'b', 'c'], -2, 1), [])
    assert.deepEqual(divvy(['a', 'b', 'c'], 2, -1), [['a', 'b']])
  })
})
