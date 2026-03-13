import type { Result } from "./types";

export async function safeRunAsync<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: e as Error as E };
  }
}
