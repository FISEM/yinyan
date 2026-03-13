import { y } from "../";

describe("y.safeRun", () => {
  test("should return success and data on valid execution", () => {
    const validJson = '{"status": "ok"}';
    const result = y.safeRun(() => JSON.parse(validJson));

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ status: "ok" });
    expect(result.error).toBeNull();
  });

  test("should return failure and error when function throws", () => {
    const invalidJson = "{ invalid }";
    const result = y.safeRun(() => JSON.parse(invalidJson));

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
  });

  test("should handle non-Error throws (strings, etc.)", () => {
    const result = y.safeRun(() => {
      throw "unexpected string error";
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("unexpected string error");
  });
});
