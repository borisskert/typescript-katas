import { assert } from 'chai'
import { mazeRunner } from '../../src/maze-runner/maze-runner'

const maze = [[1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 3],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 2, 1, 0, 1, 0, 1]]

describe('Sample Tests', function () {
  it('Should pass sample tests', function () {
    assert.equal(mazeRunner(maze, ['N', 'N', 'N', 'N', 'N', 'E', 'E', 'E', 'E', 'E']), 'Finish', 'Expected Finish')
    assert.equal(mazeRunner(maze, ['N', 'N', 'N', 'N', 'N', 'E', 'E', 'S', 'S', 'E', 'E', 'N', 'N', 'E']), 'Finish', 'Expected Finish')
    assert.equal(mazeRunner(maze, ['N', 'N', 'N', 'N', 'N', 'E', 'E', 'E', 'E', 'E', 'W', 'W']), 'Finish', 'Expected Finish')

    assert.equal(mazeRunner(maze, ['N', 'N', 'N', 'W', 'W']), 'Dead', 'Expected Dead')
    assert.equal(mazeRunner(maze, ['N', 'N', 'N', 'N', 'N', 'E', 'E', 'S', 'S', 'S', 'S', 'S', 'S']), 'Dead', 'Expected Dead')

    assert.equal(mazeRunner(maze, ['N', 'E', 'E', 'E', 'E']), 'Lost', 'Expected Lost')
  })
})
