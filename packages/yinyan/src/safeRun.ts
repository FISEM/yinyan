import type { Result } from "./types";

export function safeRun<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    return { success: true, data: fn(), error: null };
  } catch (e) {
    return { success: false, data: null, error: e as Error as E };
  }
}
