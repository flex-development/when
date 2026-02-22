/**
 * @file Unit Tests - isCatchable
 * @module when/lib/tests/unit/isCatchable
 */

import testSubject from '#lib/is-catchable'
import pathe from '@flex-development/pathe'

describe('unit:lib/isCatchable', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [testSubject],
    [{ catch: null, then: vi.fn() }],
    [{ then: pathe.cwd() }],
    [{ then: vi.fn() }]
  ])('should return `false` if `value` is not a catchable (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [Object.assign([], { catch: vi.fn(), then: vi.fn() })],
    [new Promise(vi.fn())],
    [{ catch: vi.fn(), then: vi.fn() }]
  ])('should return `true` if `value` is a catchable (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
