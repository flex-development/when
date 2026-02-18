/**
 * @file Unit Tests - when
 * @module when/lib/tests/unit/when
 */

import isThenable from '#lib/is-thenable'
import testSubject from '#lib/when'
import type { Chain } from '@flex-development/when'
import type { Mock } from 'vitest'

describe('unit:lib/when', () => {
  let chain: Mock<Chain<null, undefined>>

  beforeEach(() => {
    chain = vi.fn().mockName('chain')
  })

  it('should return non-thenable if `value` is non-thenable', () => {
    expect(testSubject(null, chain)).to.be.undefined
  })

  it('should return thenable if `value` is thenable', () => {
    // Arrange
    const value: Promise<null> = new Promise(resolve => resolve(null))

    // Act
    const result = testSubject(value, chain)

    // Expect
    expect(result).to.satisfy(isThenable).but.not.eq(value)
  })

  it('should return thenable if `chain` returns thenable', () => {
    // Setup
    chain.mockResolvedValue(undefined)

    // Act
    const result = testSubject(null, { chain })

    // Expect
    expect(result).to.satisfy(isThenable)
  })
})
