/**
 * @file createThenable
 * @module when/testing/lib/createThenable
 */

import isThenable from '#lib/is-thenable'
import type State from '#testing/types/state'
import type {
  Awaitable,
  OnFinally,
  OnFulfilled,
  OnRejected,
  Thenable
} from '@flex-development/when'
import type {
  CreateThenableOptions,
  Executor
} from '@flex-development/when/testing'

export default createThenable

/**
 * Create a thenable.
 *
 * The returned object conforms to {@linkcode Thenable} and ensures `then`
 * always returns another {@linkcode Thenable}, even when adopting a foreign
 * thenable.
 *
 * @see {@linkcode CreateThenableOptions}
 * @see {@linkcode Executor}
 * @see {@linkcode Thenable}
 *
 * @template {any} T
 *  The resolved value
 * @template {any} [Reason=Error]
 *  The reason for the rejection
 * @template {Thenable<T>} [Result=Thenable<T>]
 *  The thenable
 *
 * @this {void}
 *
 * @param {Executor<T, Reason>} executor
 *  The initialization callback
 * @param {CreateThenableOptions | null | undefined} [options]
 *  Options for creating a thenable
 * @return {Thenable<T>}
 *  The thenable
 */
function createThenable<
  T,
  Reason = Error,
  Result extends Thenable<T> = Thenable<T>
>(
  this: void,
  executor: Executor<T, Reason>,
  options?: CreateThenableOptions | null | undefined
): Result {
  /**
   * Whether the thenable has been settled.
   *
   * @var {boolean} settled
   */
  let settled: boolean = false

  /**
   * The settled state.
   *
   * @var {State<T, Reason> | undefined} state
   */
  let state!: State<T, Reason> | undefined

  try {
    executor(ok, nok)
  } catch (e: unknown) {
    nok(e as Reason)
  }

  //  executor neither resolved nor rejected, treat as `ok(undefined)`.
  if (!state) ok(undefined as T)
  return wrapState(state!) as Result

  /**
   * Adopt an awaitable into a {@linkcode Thenable}.
   *
   * If `x` is a thenable, the returned thenable follows its settlement.
   * Otherwise, the returned thenable is immediately resolved with `x`.
   *
   * @template {any} X
   *  The resolved value
   *
   * @this {void}
   *
   * @param {Awaitable<X>} x
   *  The awaitable to adopt
   * @return {Thenable<X>}
   *  A thenable representing the adopted awaitable
   */
  function adopt<X>(this: void, x: Awaitable<X>): Thenable<X> {
    if (isThenable<X>(x)) {
      // wrap foreign thenable so `then` still returns a thenable.
      return addMethods({
        /**
         * @template {any} [Next=X]
         *  The next resolved value on success
         * @template {any} [Failure=never]
         *  The next resolved value on failure
         *
         * @this {void}
         *
         * @param {OnFulfilled<X, Next> | null | undefined} [onfulfilled]
         *  The callback to execute when the thenable is resolved
         * @param {OnRejected<Failure, Reason> | null | undefined} [onrejected]
         *  The callback to execute when the thenable is rejected
         * @return {Thenable<Failure | Next>}
         *  The next thenable
         */
        then<Next = X, Failure = never>(
          this: void,
          onfulfilled?: OnFulfilled<X, Next> | null | undefined,
          onrejected?: OnRejected<Failure, Reason> | null | undefined
        ): Thenable<Failure | Next> {
          return adopt(x.then(
            /**
             * @this {void}
             *
             * @param {X} value
             *  The resolved value
             * @return {Awaitable<Next>}
             *  The next awaitable
             */
            function succ(this: void, value: X): Awaitable<Next> {
              return resolve(value, onfulfilled)
            },
            /**
             * @this {void}
             *
             * @param {unknown} e
             *  The reason for the rejection
             * @return {Awaitable<Failure>}
             *  The next awaitable
             */
            function fail(this: void, e: unknown): Awaitable<Failure> {
              return reject(e, onrejected)
            }
          ))
        }
      })
    }

    return wrapState({ ok: true, value: x })
  }

  /**
   * Add requested methods to a `thenable`.
   *
   * @template {any} U
   *  The resolved value
   *
   * @this {void}
   *
   * @param {Thenable<U>} thenable
   *  The current thenable
   * @return {Thenable<U>}
   *  The `thenable`
   */
  function addMethods<U>(this: void, thenable: Thenable<U>): Thenable<U> {
    if (!options) {
      thenable.catch = katch
      thenable.finally = finalize
      return thenable
    }

    if (options.catch) {
      thenable.catch = katch
    } else if ('catch' in options && options.catch !== false) {
      thenable.catch = options.catch
    }

    if (options.finally) {
      thenable.finally = finalize
    } else if ('finally' in options && options.finally !== false) {
      thenable.finally = options.finally
    }

    return thenable
  }

  /**
   * Attach a callback that is invoked only when `this` thenable is settled.
   *
   * @template {any} U
   *  The resolved value
   *
   * @this {Thenable<U>}
   *
   * @param {OnFinally | null | undefined} [onfinally]
   *  The callback to execute when the thenable is settled
   * @return {Thenable<U>}
   *  The next thenable
   */
  function finalize<U>(
    this: Thenable<U>,
    onfinally?: OnFinally | null | undefined
  ): Thenable<U> {
    return typeof onfinally === 'function' ? this.then(succ, fail) : this

    /**
     * @this {void}
     *
     * @param {unknown} reason
     *  The reason for the rejection
     * @return {never}
     *  Never; throws `reason`
     * @throws {unknown}
     */
    function fail(this: void, reason: unknown): never {
      void onfinally!()
      throw reason
    }

    /**
     * @this {void}
     *
     * @param {U} value
     *  The resolved value
     * @return {U}
     *  The resolved `value`
     */
    function succ(this: void, value: U): Awaitable<U> {
      return void onfinally!(), value
    }
  }

  /**
   * Attach a callback only for the rejection of `this` thenable.
   *
   * @template {any} U
   *  The resolved value
   * @template {any} [Failure=never]
   *  The resolved value on failure
   *
   * @this {Thenable<U>}
   *
   * @param {OnRejected<Failure, Reason> | null | undefined} [onrejected]
   *  The callback to execute when the thenable is rejected
   * @return {Thenable<Failure | U>}
   *  The next thenable
   */
  function katch<U, Failure = never>(
    this: Thenable<U>,
    onrejected?: OnRejected<Failure, Reason> | null | undefined
  ): Thenable<Failure | U> {
    return this.then(null, onrejected)
  }

  /**
   * Reject the thenable.
   *
   * @this {void}
   *
   * @param {Reason} reason
   *  The reason for the rejection
   * @return {undefined}
   */
  function nok(this: void, reason: Reason): undefined {
    return void (settled || (settled = true, state = { ok: false, reason }))
  }

  /**
   * Resolve the thenable.
   *
   * @this {void}
   *
   * @param {Awaitable<T>} value
   *  The awaitable
   * @return {undefined}
   */
  function ok(this: void, value: Awaitable<T>): undefined {
    return void (settled || (settled = true, state = { ok: true, value }))
  }

  /**
   * Handle a rejection.
   *
   * @template {any} T
   *  The next resolved value
   *
   * @this {void}
   *
   * @param {unknown} reason
   *  The reason for the rejection
   * @param {OnRejected<T, Reason> | null | undefined} [onrejected]
   *  The callback to execute when the thenable is rejected
   * @return {Awaitable<T>}
   *  The next awaitable
   * @throws {unknown}
   */
  function reject<T>(
    this: void,
    reason: unknown,
    onrejected: OnRejected<T, Reason> | null | undefined
  ): Awaitable<T> {
    if (typeof onrejected === 'function') return onrejected(reason as Reason)
    return wrapState({ ok: false, reason: reason as Reason })
  }

  /**
   * Handle a resolved `value`.
   *
   * @template {any} T
   *  The resolved value
   * @template {any} Next
   *  The next resolved value
   * @this {void}
   *
   * @param {T} value
   *  The resolved value
   * @return {Awaitable<Next>}
   *  The next awaitable
   */
  function resolve<T, Next>(
    this: void,
    value: T,
    onfulfilled?: OnFulfilled<T, Next> | null | undefined
  ): Awaitable<Next> {
    if (typeof onfulfilled === 'function') return onfulfilled(value)
    return value as unknown as Next
  }

  /**
   * Wrap a settled state into a {@linkcode Thenable}.
   *
   * @template {any} S
   *  The resolved value
   *
   * @this {void}
   *
   * @param {State} s
   *  The settled state
   * @return {Thenable<S>}
   *  A thenable representing the settled state
   */
  function wrapState<S>(this: void, s: State<S, Reason>): Thenable<S> {
    return addMethods({
      /**
       * @template {any} [Next=S]
       *  The next resolved value on success
       * @template {any} [Failure=never]
       *  The next resolved value on failure
       *
       * @this {void}
       *
       * @param {OnFulfilled<S, Next> | null | undefined} [onfulfilled]
       *  The callback to execute when the thenable is resolved
       * @param {OnRejected<Failure, Reason> | null | undefined} [onrejected]
       *  The callback to execute when the thenable is rejected
       * @return {Thenable<Failure | Next>}
       *  The next thenable
       * @throws {unknown}
       */
      then<Next = S, Failure = never>(
        this: void,
        onfulfilled?: OnFulfilled<S, Next> | null | undefined,
        onrejected?: OnRejected<Failure, Reason> | null | undefined
      ): Thenable<Failure | Next> {
        try {
          if (s.ok) {
            if (isThenable(s.value)) return adopt(s.value).then(succ, fail)
            return adopt(succ(s.value))

            /**
             * @this {void}
             *
             * @param {S} value
             *  The resolved value
             * @return {Awaitable<Next>}
             *  The next awaitable
             */
            function succ(this: void, value: S): Awaitable<Next> {
              return resolve(value, onfulfilled)
            }
          }

          // rejected.
          if (typeof onrejected === 'function') return adopt(fail(s.reason))
          return wrapState({ ok: false, reason: s.reason })
        } catch (e: unknown) {
          return wrapState({ ok: false, reason: e as Reason })
        }

        /**
         * @this {void}
         *
         * @param {unknown} e
         *  The reason for the rejection
         * @return {Awaitable<Failure>}
         *  The next awaitable
         */
        function fail(this: void, e: unknown): Awaitable<Failure> {
          return reject(e, onrejected)
        }
      }
    })
  }
}
