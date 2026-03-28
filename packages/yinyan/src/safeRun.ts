type safeRun<T, E = Error> = {
  default: <DefaultValue>(value: DefaultValue) => T | DefaultValue;
  onErr: <R, E>(handleError: (error: E) => R) => T | R;
};

export function safeRun<T>(fn: () => T): safeRun<T> {
  return {
    default<DefaultValue>(value: DefaultValue): T | DefaultValue {
      try {
        return fn();
      } catch {
        return value;
      }
    },

    onErr<R, E>(handleError: (error: E) => R): T | R {
      try {
        return fn();
      } catch (e) {
        return handleError(e as E);
      }
    },
  };
}
