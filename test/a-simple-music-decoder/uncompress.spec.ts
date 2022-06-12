import { uncompress } from '../../src/a-simple-music-decoder/uncompress'
import { assert } from 'chai'

describe('Basic Tests', function () {
  it('2 identical numbers', function () {
    assert.deepEqual(uncompress('1,2*2,3'), [1, 2, 2, 3])
  })
  it('3 consecutive numbers, ascending', function () {
    assert.deepEqual(uncompress('1,3-5,7'), [1, 3, 4, 5, 7])
  })
  it('3 consecutive numbers, descending', function () {
    assert.deepEqual(uncompress('1,5-3,7'), [1, 5, 4, 3, 7])
  })
  it('3 numbers with same interval, descending', function () {
    assert.deepEqual(uncompress('1,10-6/2,7'), [1, 10, 8, 6, 7])
  })
})
