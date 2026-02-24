/**
 * @file Functional Tests - when
 * @module when/lib/tests/functional/when
 */

import boom from '#fixtures/boom'
import resolved from '#fixtures/resolved'
import thenables from '#fixtures/thenables'
import isThenable from '#lib/is-thenable'
import testSubject from '#lib/when'
import thrower from '#tests/utils/thrower'
import type { EmptyObject } from '@flex-development/tutils'
import type {
  Awaitable,
  Chain,
  Fail,
  Finish,
  Options
} from '@flex-development/when'
import type { Mock } from 'vitest'

describe('functional:lib/when', () => {
  type T = unknown
  type Args = [URL]
  type Next = undefined
  type This = EmptyObject
  type Opts = Options<T, Next, Next, Args, Error, This>

  let args: Args
  let chain: Mock<Chain<T, Next, Args, This>>
  let context: This
  let fail: Mock<Fail<Next, Error, This>>
  let finish: Mock<Finish<This>>

  beforeAll(() => {
    args = [new URL(import.meta.url)]
    context = {}
  })

  beforeEach(() => {
    chain = vi.fn().mockName('chain')
    fail = vi.fn().mockName('fail')
    finish = vi.fn().mockName('finish')
  })

  describe('non-thenable', () => {
    it('should call `chain` callback immediately', () => {
      // Act
      const result = testSubject(resolved.succ, {
        args,
        chain,
        context,
        fail,
        finish
      })

      // Expect
      expect(result).to.not.satisfy(isThenable)
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, resolved.succ)
      expect(chain.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(chain)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should catch error with `fail`', () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Act
      const result = testSubject(resolved.fail, {
        args,
        chain,
        context,
        fail,
        finish
      })

      // Expect
      expect(result).to.not.satisfy(isThenable)
      expect(fail).toHaveBeenCalledAfter(chain)
      expect(fail).toHaveBeenCalledExactlyOnceWith(boom)
      expect(fail.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(fail)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should throw on error without `fail`', () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Arrange
      const options: Options<T, Next, Next, Args> = { args, chain, finish }

      // Act + Expect
      expect((): undefined => testSubject(resolved.fail, options)).to.throw()
      expect(fail).toHaveBeenCalledTimes(0)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', undefined)
    })
  })

  describe('thenable', () => {
    beforeEach(() => {
      vi.spyOn(thenables.fail, 'then')
      vi.spyOn(thenables.succ, 'then')
    })

    it('should call `chain` callback after resolution', async () => {
      // Arrange
      const options: Opts = { args, chain, context, finish }

      // Act
      const result = testSubject(thenables.succ, options)
      await result

      // Expect
      expect(result).to.satisfy(isThenable)
      expect(chain).toHaveBeenCalledAfter(vi.mocked(thenables.succ.then))
      expect(chain).toHaveBeenCalledExactlyOnceWith(...args, resolved.succ)
      expect(chain.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(chain)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `chain` rejects', async () => {
      // Setup
      chain.mockRejectedValueOnce(boom)

      // Act
      await testSubject(thenables.succ, { args, chain, context, fail, finish })

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(thenables.succ.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(boom)
      expect(fail.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(fail)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `chain` throws (%#)', async () => {
      // Setup
      chain.mockImplementationOnce(thrower)

      // Act
      await testSubject(thenables.succ, { args, chain, context, fail, finish })

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(thenables.succ.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(boom)
      expect(fail.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(fail)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should call `fail` if `value` rejects', async () => {
      // Act
      await testSubject(thenables.fail, { args, chain, context, fail, finish })

      // Expect
      expect(fail).toHaveBeenCalledAfter(vi.mocked(thenables.fail.then))
      expect(fail).toHaveBeenCalledExactlyOnceWith(boom)
      expect(fail.mock.contexts).to.have.property('0', context)
      expect(finish).toHaveBeenCalledAfter(fail)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should throw on rejection w/o `fail` (`chain`) (%#)', async () => {
      // Setup
      chain.mockRejectedValueOnce(boom)

      // Act
      const result: Awaitable<undefined> = testSubject(thenables.succ, {
        args,
        chain,
        context,
        finish
      })

      // Expect
      await expect(async () => result).rejects.to.throw(boom)
      expect(fail).toHaveBeenCalledTimes(0)
      expect(finish).toHaveBeenCalledAfter(chain)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })

    it('should throw on rejection w/o `fail` (`value`)', async () => {
      // Act
      const result: Awaitable<undefined> = testSubject(thenables.fail, {
        args,
        chain,
        context,
        finish
      })

      // Expect
      await expect(async () => result).rejects.to.throw(boom)
      expect(fail).toHaveBeenCalledTimes(0)
      expect(finish).toHaveBeenCalledOnce()
      expect(finish.mock.contexts).to.have.property('0', context)
    })
  })
})
