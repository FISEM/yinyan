type SafeRunAsyncResult<T> = {
  default: <DefaultValue>(value: DefaultValue) => Promise<T | DefaultValue>;
  onErr: <R, E = Error>(handleError: (error: E) => R) => Promise<T | R>;
};

export function safeRunAsync<T>(
  fn: () => Promise<T>,
  timeout?: number,
): SafeRunAsyncResult<T> {
  const execute = async (): Promise<T> => {
    if (timeout === undefined) return await fn();

    let timer: ReturnType<typeof setTimeout> | undefined;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeout}ms`));
      }, timeout);
    });

    try {
      const result = await Promise.race([fn(), timeoutPromise]);
      clearTimeout(timer);
      return result;
    } catch (error) {
      clearTimeout(timer);
      throw error;
    }
  };

  return {
    async default<DefaultValue>(
      value: DefaultValue,
    ): Promise<T | DefaultValue> {
      try {
        return await execute();
      } catch {
        return value;
      }
    },

    async onErr<R, E = Error>(handleError: (error: E) => R): Promise<T | R> {
      try {
        return await execute();
      } catch (error) {
        return handleError(error as E);
      }
    },
  };
}
