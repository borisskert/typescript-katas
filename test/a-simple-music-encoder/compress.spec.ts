import { assert } from 'chai'
import { compress } from '../../src/a-simple-music-encoder/compress'

describe('Basic Tests', function () {
  it('2 identical numbers', function () {
    assert.strictEqual(compress([1, 2, 2, 3]), '1,2*2,3')
  })
  it('3 consecutive numbers, ascending', function () {
    assert.strictEqual(compress([1, 3, 4, 5, 7]), '1,3-5,7')
  })
  it('3 consecutive numbers, descending', function () {
    assert.strictEqual(compress([1, 5, 4, 3, 7]), '1,5-3,7')
  })
  it('3 numbers with same interval, descending', function () {
    assert.strictEqual(compress([1, 10, 8, 6, 7]), '1,10-6/2,7')
  })
})
