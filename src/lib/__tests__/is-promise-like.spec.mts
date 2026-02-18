/**
 * @file Unit Tests - isPromiseLike
 * @module when/lib/tests/unit/isPromiseLike
 */

import testSubject from '#lib/is-promise-like'
import pathe from '@flex-development/pathe'

describe('unit:lib/isPromiseLike', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [testSubject],
    [{ then: pathe.cwd() }]
  ])('should return `false` if `value` is not promise-like (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [new Promise(vi.fn())],
    [{ then: vi.fn() }]
  ])('should return `true` if `value` is promise-like (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
