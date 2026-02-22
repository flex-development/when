/**
 * @file Interfaces - PromiseLike
 * @module when/interfaces/PromiseLike
 */

declare global {
  interface PromiseLike<T> {
    /**
     * Attach callbacks for resolution and/or rejection.
     *
     * @template {any} [S=T]
     *  The next resolved value on success
     * @template {any} [F=never]
     *  The next resolved value on failure
     *
     * @this {unknown}
     *
     * @param {((value: T) => PromiseLike<S> | S) | null | undefined} [succ]
     *  The callback to execute when the thenable is resolved
     * @param {((reason: any) => F | PromiseLike<F>) | null | undefined} [fail]
     *  The callback to execute when the thenable is rejected
     * @return {PromiseLike<F | S>}
     *  The next promise-like object
     */
    then<S = T, F = never>(
      succ?: ((value: T) => PromiseLike<S> | S) | null | undefined,
      fail?: ((reason: any) => F | PromiseLike<F>) | null | undefined
    ): PromiseLike<F | S>
  }
}

export type {}
