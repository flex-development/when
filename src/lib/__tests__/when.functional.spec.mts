/**
 * @file Functional Tests - when
 * @module when/lib/tests/functional/when
 */

import isPromiseLike from '#lib/is-promise-like'
import testSubject from '#lib/when'
import type { EmptyObject } from '@flex-development/tutils'
import type { Awaitable, Chain, Reject } from '@flex-development/when'
import type { Mock } from 'vitest'

describe('functional:lib/when', () => {
  type Args = [URL]
  type Next = undefined
  type Self = EmptyObject

  let args: Args
  let chain: Mock<Chain<boolean, Next, Args, Self>>
  let context: Self
  let error: Error
  let reject: Mock<Reject<Next, Error, Self>>

  beforeAll(() => {
    args = [new URL(import.meta.url)]
    context = {}
    error = new Error('nope', { cause: { test: true } })
  })

  beforeEach(() => {
    chain = vi.fn().mockName('chain')
    reject = vi.fn().mockName('reject')
  })

  describe('non-thenable', () => {
    let fail: false
    let failure: (this: void) => never
    let succ: true

    beforeAll(() => {
      fail = false
      succ = true

      /**
       * @this {void}
       *
       * @return {never}
       *  Never; throws mock error
       * @throws {Error}
       */
      failure = function failure(this: void): never {
        throw error
      }
    })

    it('should call `chain` callback immediately', async () => {
      // Act
      const result = testSubject(succ, chain, reject, context, ...args)

      // Expect
      expect(result).to.not.satisfy(isPromiseLike)
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, succ)
      expect(chain.mock.contexts).to.have.property('0', context)
    })

    it('should catch error with `reject`', () => {
      // Setup
      chain.mockImplementationOnce(failure)

      // Act
      const result = testSubject(fail, { args, chain, context, reject })

      // Expect
      expect(result).to.not.satisfy(isPromiseLike)
      expect(reject).toHaveBeenCalledAfter(chain)
      expect(reject).toHaveBeenCalledExactlyOnceWith(error)
      expect(reject.mock.contexts).to.have.property('0', context)
    })

    it('should throw on error without `reject`', () => {
      // Setup
      chain.mockImplementationOnce(failure)

      // Act + Expect
      expect(() => testSubject(fail, { chain })).to.throw(error)
    })
  })

  describe('thenable', () => {
    let fail: Promise<never>
    let succ: Promise<typeof value>
    let value: true

    beforeAll(() => {
      value = true
      succ = new Promise(resolve => resolve(value))
      fail = new Promise((resolve, reject) => reject(error))
    })

    beforeEach(() => {
      vi.spyOn(fail, 'then')
      vi.spyOn(succ, 'then')
    })

    it('should call `chain` callback after thenable resolves', async () => {
      // Act
      const result = testSubject(succ, { args, chain, context, reject })
      await result

      // Expect
      expect(result).to.satisfy(isPromiseLike)
      expect(chain).toHaveBeenCalledAfter(vi.mocked(succ.then))
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, value)
      expect(chain.mock.contexts).to.have.property('0', context)
    })

    it('should call `reject` on error (`chain` error)', async () => {
      // Setup
      chain.mockRejectedValueOnce(error)

      // Act
      const result = testSubject(fail, chain, reject, context, ...args)
      await result

      // Expect
      expect(result).to.satisfy(isPromiseLike)
      expect(reject).toHaveBeenCalledAfter(vi.mocked(fail.then))
      expect(reject).toHaveBeenCalledExactlyOnceWith(error)
      expect(reject.mock.contexts).to.have.property('0', context)
    })

    it('should call `reject` on error (`value` error)', async () => {
      // Act
      const result = testSubject(fail, { args, chain, context, reject })
      await result

      // Expect
      expect(result).to.satisfy(isPromiseLike)
      expect(reject).toHaveBeenCalledAfter(vi.mocked(fail.then))
      expect(reject).toHaveBeenCalledExactlyOnceWith(error)
      expect(reject.mock.contexts).to.have.property('0', context)
    })

    it('should throw on error without `reject` (`chain` error)', async () => {
      // Setup
      chain.mockRejectedValueOnce(error)

      // Arrange
      const result: Awaitable<undefined> = testSubject(succ, { args, chain })

      // Act + Expect
      await expect(async () => result).rejects.to.throw(error)
    })

    it('should throw on error without `reject` (`value` error)', async () => {
      // Arrange
      const result: Awaitable<undefined> = testSubject(fail, { args, chain })

      // Act + Expect
      await expect(async () => result).rejects.to.throw(error)
    })
  })
})
