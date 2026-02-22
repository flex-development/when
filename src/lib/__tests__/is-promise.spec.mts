/**
 * @file Unit Tests - isPromise
 * @module when/lib/tests/unit/isPromise
 */

import testSubject from '#lib/is-promise'

describe('unit:lib/isPromise', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [{ catch: null, then: vi.fn() }],
    [{ catch: vi.fn(), finally: {}, then: vi.fn() }],
    [{ then: vi.fn() }, false]
  ])('should return `false` if `value` cannot be a promise (%#)', (
    value,
    finalizable
  ) => {
    expect(testSubject(value, finalizable)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [new Promise(vi.fn())],
    [{ catch: vi.fn(), finally: vi.fn(), then: vi.fn() }, null],
    [{ catch: vi.fn(), then: vi.fn() }, false]
  ])('should return `true` if `value` looks like a promise (%#)', (
    value,
    finalizable
  ) => {
    expect(testSubject(value, finalizable)).to.be.true
  })
})
