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
    [{ catch: false, then: vi.fn() }],
    [{ finally: {}, then: vi.fn() }],
    [{ then: pathe.cwd() }]
  ])('should return `false` if `value` is not a thenable (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [Object.assign([0], { then: vi.fn() })],
    [Object.assign(vi.fn(), { then: vi.fn() })],
    [new Promise(vi.fn())],
    [{ catch: null, finally: null, then: vi.fn() }],
    [{ catch: undefined, then: vi.fn() }],
    [{ catch: vi.fn(), finally: vi.fn(), then: vi.fn() }],
    [{ catch: vi.fn(), then: vi.fn() }],
    [{ finally: undefined, then: vi.fn() }],
    [{ finally: vi.fn(), then: vi.fn() }],
    [{ then: vi.fn() }]
  ])('should return `true` if `value` is a thenable (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
