import { assert } from 'chai'
import { spinWords } from '../../src/stop-gninnips-my-sdrow/spin-words'

describe('spinWords', () => {
  it('should pass some fixed tests', () => {
    assert.strictEqual(spinWords('Hey fellow warriors'), 'Hey wollef sroirraw')
  })
})
