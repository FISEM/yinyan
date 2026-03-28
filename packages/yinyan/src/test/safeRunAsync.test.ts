import { expect, test, describe, jest, beforeEach, afterEach } from "bun:test";
import { safeRunAsync } from "../";

describe("safeRunAsync", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should work without timeout", async () => {
    const task = async () => "no_timeout";
    const result = await safeRunAsync(task).default("fallback");
    expect(result).toBe("no_timeout");
  });

  test("should return default value when timing out", async () => {
    const slowTask = () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("too slow"), 1000);
      });

    const promise = safeRunAsync(slowTask, 500).default("timeout_hit");

    jest.advanceTimersByTime(600);

    const result = await promise;
    expect(result).toBe("timeout_hit");
  });

  test("should return data if it finishes before timeout", async () => {
    const task = () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("done"), 100);
      });

    const promise = safeRunAsync(task, 500).default("failed");

    jest.advanceTimersByTime(150);

    const result = await promise;
    expect(result).toBe("done");
  });

  test("should trigger onErr on timeout", async () => {
    const slowTask = () =>
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error("too slow")), 1000);
      });

    const promise = safeRunAsync(slowTask, 100).onErr(
      (err: Error) => err.message,
    );

    jest.advanceTimersByTime(150);

    const result = await promise;
    expect(result).toContain("timed out after 100ms");
  });
});
