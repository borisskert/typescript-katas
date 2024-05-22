import { smallest } from '../../src/find-the-smallest/smallest'
import chai, { assert } from 'chai'

chai.config.truncateThreshold = 0

describe('Fixed Tests smallest', function () {
  it('Basic tests', function () {
    assert.deepEqual(smallest(261235), [126235, 2, 0])
    assert.deepEqual(smallest(209917), [29917, 0, 1])
    assert.deepEqual(smallest(285365), [238565, 3, 1])
    assert.deepEqual(smallest(269045), [26945, 3, 0])
    assert.deepEqual(smallest(296837), [239687, 4, 1])
  })
})
