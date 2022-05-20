import { assert } from 'chai'

import { pigIt } from '../../src/simple-pig-latin/pig-it'

describe('Tests', () => {
  it('test', () => {
    assert.strictEqual(pigIt('Pig latin is cool'), 'igPay atinlay siay oolcay')
    assert.strictEqual(pigIt('This is my string'), 'hisTay siay ymay tringsay')
    assert.strictEqual(pigIt('O tempora o mores !'), 'Oay emporatay oay oresmay !')
    assert.strictEqual(pigIt('Quis custodiet ipsos custodes ?'), 'uisQay ustodietcay psosiay ustodescay ?')
    assert.strictEqual(
      pigIt(
        '! . cGqhJjxRJSw toka qhaTULjqIMYwNpZJ q aLiLTzvHSWMI scOsmuBHlXjD qXgQtHtZSeSGF . cgG VPvI ! ZIRXqHGXX EXbrYpOigAxdP'
      ),
      '! . GqhJjxRJSwcay okatay haTULjqIMYwNpZJqay qay LiLTzvHSWMIaay cOsmuBHlXjDsay XgQtHtZSeSGFqay . gGcay PvIVay ! IRXqHGXXZay XbrYpOigAxdPEay'
    )
    assert.strictEqual(
      pigIt(
        ' xWI vZnSlQGBNIfyHAGOfKy . DqFUbPbAzlBxn wbiWcuUDKsZx .'
      ),
      ' WIxay ZnSlQGBNIfyHAGOfKyvay . qFUbPbAzlBxnDay biWcuUDKsZxway .'
    )
  })
})
