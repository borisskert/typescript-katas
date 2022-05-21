import solution = require('../../src/help-your-granny/tour')
import { assert } from 'chai'

function dotest (friends: string[], fTowns: string[][], distTable: Array<string | number>, expected: number): void {
  assert.equal(solution.G964.tour(friends, fTowns, distTable), expected)
}

describe('Fixed Tests', function () {
  it('tour', function () {
    const friends1 = ['A1', 'A2', 'A3', 'A4', 'A5']
    const fTowns1 = [['A1', 'X1'], ['A2', 'X2'], ['A3', 'X3'], ['A4', 'X4']]
    const distTable1 = ['X1', 100.0, 'X2', 200.0, 'X3', 250.0, 'X4', 300.0]
    dotest(friends1, fTowns1, distTable1, 889)
  })
})
