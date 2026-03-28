import { y } from "../";

describe("y.safeRun", () => {
  describe(".default()", () => {
    test("should return data if execution succeeds", () => {
      const result = y.safeRun(() => "success").default("fallback");
      expect(result).toBe("success");
    });

    test("should return fallback value if execution fails", () => {
      const result = y
        .safeRun(() => {
          throw new Error();
        })
        .default("fallback");
      expect(result).toBe("fallback");
    });
  });

  describe(".onErr()", () => {
    test("should return data if execution succeeds (callback not called)", () => {
      const spy = jest.fn();
      const result = y.safeRun(() => "success").onErr(spy);

      expect(result).toBe("success");
      expect(spy).not.toHaveBeenCalled();
    });

    test("should execute callback and return its result if execution fails", () => {
      const errorMsg = "failed!";
      const result = y
        .safeRun(() => {
          throw new Error(errorMsg);
        })
        .onErr((err: Error) => {
          return err.message;
        });

      expect(result).toBe(errorMsg);
    });

    test("should handle non-Error throws in onErr", () => {
      const result = y
        .safeRun(() => {
          throw "string error";
        })
        .onErr((err: Error) => err);

      expect(result).toBe("string error");
    });
  });
});
