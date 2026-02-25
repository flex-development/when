/**
 * @file Interfaces - CreateThenableOptions
 * @module when/testing/interfaces/CreateThenableOptions
 */

/**
 * Options for creating a thenable.
 */
interface CreateThenableOptions {
  /**
   * Control whether returned thenables implement a `catch` method.
   *
   * When an options object is omitted, `null`, or `undefined`,
   * the method will be implemented.
   *
   * When an options object is provided, `catch` is only implemented
   * if `options.catch` is `true`.
   *
   * If `options.catch` is `null` or `undefined`, the thenable's `catch`
   * property will have the same value.\
   * Pass `false` to disable the method implementation.
   */
  catch?: boolean | null | undefined

  /**
   * Control whether returned thenables implement a `finally` method.
   *
   * When an options object is omitted, `null`, or `undefined`,
   * the method will be implemented.
   *
   * When an options object is provided, `finally` is only implemented
   * if `options.finally` is `true`.
   *
   * If `options.finally` is `null` or `undefined`, the thenable's `finally`
   * property will have the same value.\
   * Pass `false` to disable the method implementation.
   */
  finally?: boolean | null | undefined
}

export type { CreateThenableOptions as default }
