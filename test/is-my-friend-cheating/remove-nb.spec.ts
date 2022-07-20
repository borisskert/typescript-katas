import { assert } from 'chai'
import { G964 } from '../../src/is-my-friend-cheating/remove-nb'

function testIt (n: number, expected: number[][]): void {
  assert.deepEqual(G964.removeNb(n), expected)
}

describe('Fixed Tests removeNb', function () {
  it('Basic tests', function () {
    testIt(26, [[15, 21], [21, 15]])
    testIt(101, [[55, 91], [91, 55]])
    testIt(102, [[70, 73], [73, 70]])
    testIt(110, [[70, 85], [85, 70]])
  })
})
