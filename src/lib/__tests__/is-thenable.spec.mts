/**
 * @file Unit Tests - isThenable
 * @module when/lib/tests/unit/isThenable
 */

import testSubject from '#lib/is-thenable'
import pathe from '@flex-development/pathe'

describe('unit:lib/isThenable', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [testSubject],
    [{ then: pathe.cwd() }]
  ])('should return `false` if `value` is not thenable (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [new Promise(vi.fn())],
    [{ then: vi.fn() }]
  ])('should return `true` if `value` is thenable (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
