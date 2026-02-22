/**
 * @file Unit Tests - isFinalizable
 * @module when/lib/tests/unit/isFinalizable
 */

import testSubject from '#lib/is-finalizable'
import pathe from '@flex-development/pathe'

describe('unit:lib/isFinalizable', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [testSubject],
    [{ finally: null, then: vi.fn() }],
    [{ then: pathe.cwd() }],
    [{ then: vi.fn() }]
  ])('should return `false` if `value` is not a finalizable (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [Object.assign([], { finally: vi.fn(), then: vi.fn() })],
    [new Promise(vi.fn())],
    [{ finally: vi.fn(), then: vi.fn() }]
  ])('should return `true` if `value` is a finalizable (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
