import { assert } from 'chai'
import { dirReduc } from '../../src/directions-reduction/dir-reduc'

describe('Fixed Tests', function () {
  it('dirReduc', function () {
    assert.deepEqual(dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST']), ['WEST'])
    assert.deepEqual(dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH']), [])
  })
})
