/**
 * @file Interfaces - CreateThenableOptions
 * @module when/testing/interfaces/CreateThenableOptions
 */

/**
 * Options for creating a thenable.
 */
interface CreateThenableOptions {
  /**
   * Whether returned thenables should implement a `catch` method.
   */
  catch?: boolean | null | undefined

  /**
   * Whether returned thenables should implement a `finally` method.
   */
  finally?: boolean | null | undefined
}

export type { CreateThenableOptions as default }
