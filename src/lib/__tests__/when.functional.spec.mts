/**
 * @file Functional Tests - when
 * @module when/lib/tests/functional/when
 */

import isThenable from '#lib/is-thenable'
import testSubject from '#lib/when'
import type { EmptyObject } from '@flex-development/tutils'
import type { Awaitable, Chain, Fail } from '@flex-development/when'
import type { Mock } from 'vitest'

describe('functional:lib/when', () => {
  type Args = [URL]
  type Next = undefined
  type This = EmptyObject

  let args: Args
  let chain: Mock<Chain<boolean, Next, Args, This>>
  let context: This
  let error: Error
  let thrower: (this: void) => never
  let fail: Mock<Fail<Next, Error, This>>

  beforeAll(() => {
    args = [new URL(import.meta.url)]
    context = {}
    error = new Error('nope', { cause: { test: true } })

    /**
     * @this {void}
     *
     * @return {never}
     *  Never; throws mock error
     * @throws {Error}
     */
    thrower = function failure(this: void): never {
      throw error
    }
  })

  beforeEach(() => {
    chain = vi.fn().mockName('chain')
    fail = vi.fn().mockName('reject')
  })

  describe('non-thenable', () => {
    let failure: false
    let succ: true

    beforeAll(() => {
      failure = false
      succ = true
    })

    it('should call `chain` callback immediately', async () => {
      // Act
      const result = testSubject(succ, chain, fail, context, ...args)

      // Expect
      expect(result).to.not.satisfy(isThenable)
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, succ)
      expect(chain.mock.contexts).to.have.property('0', context)
    })

    it('should catch error with `reject`', () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Act
      const result = testSubject(failure, { args, chain, context, fail })

      // Expect
      expect(result).to.not.satisfy(isThenable)
      expect(fail).toHaveBeenCalledAfter(chain)
      expect(fail).toHaveBeenCalledExactlyOnceWith(error)
      expect(fail.mock.contexts).to.have.property('0', context)
    })

    it('should throw on error without `reject`', () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Act + Expect
      expect(() => testSubject(failure, { chain })).to.throw()
    })
  })

  describe('thenable', () => {
    let failure: Promise<never>
    let succ: Promise<typeof value>
    let value: true

    beforeAll(() => {
      value = true
      succ = new Promise(resolve => resolve(value))
      failure = new Promise((resolve, reject) => reject(error))
    })

    beforeEach(() => {
      vi.spyOn(failure, 'then')
      vi.spyOn(succ, 'then')
    })

    it('should call `chain` callback after thenable resolves', async () => {
      // Act
      const result = testSubject(succ, { args, chain, context, fail })
      await result

      // Expect
      expect(result).to.satisfy(isThenable)
      expect(chain).toHaveBeenCalledAfter(vi.mocked(succ.then))
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, value)
      expect(chain.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `chain` rejects', async () => {
      // Setup
      chain.mockRejectedValueOnce(error)

      // Act
      await testSubject(succ, chain, fail, context, ...args)

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(succ.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(error)
      expect(fail.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `chain` throws', async () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Act
      await testSubject(succ, chain, fail, context, ...args)

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(succ.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(error)
      expect(fail.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `value` rejects', async () => {
      // Act
      await testSubject(failure, { args, chain, context, fail })

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(failure.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(error)
      expect(fail.mock.contexts).to.have.property('0', context)
    })

    it('should throw on rejection w/o `fail` (`chain` rejects)', async () => {
      // Setup
      chain.mockRejectedValueOnce(error)

      // Arrange
      const result: Awaitable<undefined> = testSubject(succ, { args, chain })

      // Act + Expect
      await expect(async () => result).rejects.to.throw(error)
    })

    it('should throw on rejection w/o `fail` (`value` rejects)', async () => {
      // Arrange
      const result: Awaitable<undefined> = testSubject(failure, { args, chain })

      // Act + Expect
      await expect(async () => result).rejects.to.throw(error)
    })
  })
})
