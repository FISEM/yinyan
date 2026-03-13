import { y } from "../index";

describe("y.safeRunAsync", () => {
  // Cas 1 : Succès (Comme quand le token est valide)
  test("should handle a successful async operation", async () => {
    // On simule une fonction qui prend du temps et réussit
    async function mockAuthenticate(token: string) {
      return { access: "valid_token" };
    }

    const result = await y.safeRunAsync(mockAuthenticate("my_token"));

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ access: "valid_token" });
    expect(result.error).toBeNull();
  });

  // Cas 2 : Échec (Comme ton enfer de débuggage SurrealDB)
  test("should catch the crash when the promise rejects", async () => {
    // On simule exactement ce que fait SurrealDB quand le token expire
    async function mockExpiredAuth() {
      throw new Error("Token expired"); // Le SDK fait un 'throw' interne
    }

    // On passe l'appel de la fonction à safeRunAsync
    const result = await y.safeRunAsync(mockExpiredAuth());

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe("Token expired");
  });
});
