# Yinyan (☯️)

Handle errors as values. Bring balance and predictability to TypeScript.

Yinyan is a lightweight utility designed to eliminate the unpredictability of `try/catch` blocks. It wraps execution flows into a structured **Result pattern**, ensuring that every operation—synchronous or asynchronous—is handled as data.

---

## GitHub Description

☯️ **Yinyan: Error-as-value utility for TypeScript. Transform synchronous and asynchronous exceptions into predictable data structures. Stop catching crashes, start balancing your logic.**

---

# Why Yinyan?

In modern TypeScript development, 3rd-party SDKs and native functions often throw unexpectedly for business logic errors (like expired tokens or invalid parsing).  
Yinyan captures these "crashes" and returns them as a clear, type-safe status.

- **Explicit Flow Control** – No more "hidden" exceptions.
- **Async Safety** – Perfect for database drivers and network requests.
- **Predictable Types** – Always know the state of your data.
- **Zero Dependencies** – Pure TypeScript.

---

# Installation

```bash
npm install yinyan
```

---

# Core API

## y.safeRun(fn)

Wrap synchronous logic that might throw exceptions, such as `JSON.parse`.

```ts
import { y } from "yinyan";

const result = y.safeRun(() => JSON.parse(maybeInvalidJson));

if (result.success) {
  console.log(result.data); // Data is safely typed
} else {
  console.error(result.error); // Error is handled as a value
}
```

---

## y.safeRunAsync(promise)

The ultimate shield for Promises, database queries (e.g., SurrealDB), and Fetch requests.

```ts
import { y } from "yinyan";

// No more unpredictable crashes!
const auth = await y.safeRunAsync(db.authenticate(token));

if (!auth.success) {
  // Business errors (like expired tokens) are caught here
  console.warn("Auth failed:", auth.error);
  return { authenticated: false };
}

// Success is guaranteed and data is ready
console.log("Logged in:", auth.data);
```

---

# The Yinyan Structure

Every `y` function returns a consistent discriminated union:

```ts
type Yinyan<T, E = Error> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };
```

---

# Philosophy

Success and Failure are two sides of the same coin.  
By treating them as a single data structure, **Yinyan** ensures your code remains balanced and stable.

**Balance your code. Use Yinyan. ☯️**
