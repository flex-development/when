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
  ])('should return `false` if `value` cannot be a promise (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [Object.assign([], { catch: vi.fn(), then: vi.fn() })],
    [Object.assign(vi.fn(), { catch: vi.fn(), then: vi.fn() })],
    [new Promise(vi.fn())],
    [{ catch: vi.fn(), then: vi.fn() }]
  ])('should return `true` if `value` looks like a promise (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
