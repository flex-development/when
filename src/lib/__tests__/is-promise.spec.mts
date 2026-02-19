/**
 * @file Unit Tests - isPromise
 * @module when/lib/tests/unit/isPromise
 */

import testSubject from '#lib/is-promise'

describe('unit:lib/isPromise', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [{ then: vi.fn() }],
    [{ catch: null, then: vi.fn() }]
  ])('should return `false` if `value` is not a promise (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it('should return `true` if `value` is a promise', () => {
    expect(testSubject(new Promise(vi.fn()))).to.be.true
  })
})
