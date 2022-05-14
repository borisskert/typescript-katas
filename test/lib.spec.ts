import { greeting } from '../src/lib'
import { expect } from 'chai'

describe('Lib test', () => {
  it('Should return greeting', () => {
    expect(greeting()).to.equal('Hello World!')
  })
})
