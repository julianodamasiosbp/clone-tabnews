import orchestrator from "test/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonynous user", () => {
    test("Retrieving current system status", async () => {
      const ambiente = process.env.NODE_ENV === "production" ? "prod" : "dev";
      const postgresVersion = ambiente === "dev" ? "16.0" : "16.6";
      const maxConnections = ambiente === "dev" ? 100 : 112;

      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.database.version).toEqual(
        postgresVersion,
      );

      expect(responseBody.dependencies.database.max_connections).toEqual(
        maxConnections,
      );

      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
