import { assert } from 'chai'
import solution = require('../../src/second-variation-on-caesar-cipher/caesar2')

function dotest1 (s: string, k: number, expected: string[]): void {
  // console.log('encodeStr\n')
  assert.deepEqual(solution.G964.encodeStr(s, k), expected)
  // console.log('---\n')
}

function dotest2 (s: string[], expected: string): void {
  // console.log('decode\n')
  assert.equal(solution.G964.decode(s), expected)
  // console.log('---\n')
}

describe('Fixed Tests', function () {
  it('encode, decode', function () {
    const u = 'I should have known that you would have a perfect answer for me!!!'
    const v = ['ijJ tipvme ibw', 'f lopxo uibu z', 'pv xpvme ibwf ', 'b qfsgfdu botx', 'fs gps nf!!!']
    dotest1(u, 1, v)
    dotest2(v, u)
  })
})
