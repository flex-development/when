/**
 * @file Unit Tests - createThenable
 * @module when/testing/lib/tests/unit/createThenable
 */

import isCatchable from '#lib/is-catchable'
import isFinalizable from '#lib/is-finalizable'
import isPromise from '#lib/is-promise'
import isThenable from '#lib/is-thenable'
import testSubject from '#testing/lib/create-thenable'
import { noop } from '@flex-development/tutils'
import type { CreateThenableOptions } from '@flex-development/when/testing'

describe('unit:testing/lib/createThenable', () => {
  it.each<[CreateThenableOptions]>([
    [{}],
    [{ catch: false }],
    [{ catch: null, finally: undefined }],
    [{ finally: false }]
  ])('should return bare thenable (%#)', options => {
    // Act
    const result = testSubject(noop, options)

    // Expect
    expect(result).to.satisfy(isThenable)
    expect(result).to.satisfy(isThenable).to.not.satisfy(isCatchable)
    expect(result).to.satisfy(isThenable).to.not.satisfy(isFinalizable)
    expect(result).to.satisfy(isThenable).to.not.satisfy(isPromise)
  })

  it.each<[(CreateThenableOptions | null | undefined)?]>([
    [],
    [null],
    [{ catch: true }]
  ])('should return catchable (%#)', options => {
    expect(testSubject(noop, options)).to.satisfy(isCatchable)
  })

  it.each<[(CreateThenableOptions | null | undefined)?]>([
    [],
    [null],
    [{ finally: true }]
  ])('should return finalizable (%#)', options => {
    expect(testSubject(noop, options)).to.satisfy(isFinalizable)
  })

  it.each<[(CreateThenableOptions | null | undefined)?]>([
    [],
    [null],
    [{ catch: true, finally: true }]
  ])('should return promise (modern) (%#)', options => {
    expect(testSubject(noop, options)).to.satisfy(isPromise)
  })
})
