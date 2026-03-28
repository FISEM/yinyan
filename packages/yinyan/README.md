@emmanuelcode/yinyan
A lightweight, zero-dependency utility to handle errors gracefully. Stop the "variable renaming hell" and replace `try/catch` with a clean, fluent API.
Installation
```bash
bun add @emmanuelcode/yinyan
```
Usage
safeRun (Sync)
Get rid of `result.data` and `result.success` checks.
```typescript
import { safeRun } from "@emmanuelcode/yinyan";
// 1. One-liner with a default value
const token = safeRun(() => "secret").default(null);
// 2. Handle errors with a callback
const data = safeRun(() => { throw "crash" }).onErr((err: Error) => `Recovered: ${err.message}`);
```
safeRunAsync (Async)
Manage Promises and timeouts with the same fluid syntax.
```typescript
import { safeRunAsync } from "@emmanuelcode/yinyan";
// 1. Simple async fallback
const user = await safeRunAsync(() => fetchUser()).default(guestUser);
// 2. With a timeout (in milliseconds)
const config = await safeRunAsync(() => fetchConfig(), 500).default(defaultConfig);
// 3. Custom error handler
const result = await safeRunAsync(() => performTask())
.onErr((err: Error) => console.error(err.message));
```
Why @emmanuelcode/yinyan?
Unlike traditional "Result" patterns (inspired by Rust/Go), yinyan avoids variable name collisions. You don't need to rename `data1`, `sdata2`, or `error` variables in every scope. You simply chain `.default()` or `.onErr()` to get your final value immediately.
Version: 1.0.2
License: MIT