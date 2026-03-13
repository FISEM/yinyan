/**
 * A standard Result type to handle errors as values.
 */
export type Result<T, E = Error> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };
