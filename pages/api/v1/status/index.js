import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: controller.onNoMatchHandler,
  onError: controller.onErrorHandler,
});

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const versionDatabase = await getSQLVersion();
  const maxDatabaseConnections = await getSQLMaxConnection();
  const openedDatabaseConnections = await getSQLConnectionUsed();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionDatabase,
        max_connections: maxDatabaseConnections,
        opened_connections: openedDatabaseConnections,
      },
    },
  });
}

async function getSQLVersion() {
  /*
  const queryResult = await database.query("SELECT version();");
  return queryResult.rows[0].version.toString().substring(0, 15);
  */
  const queryResult = await database.query("SHOW server_version;");
  return queryResult.rows[0].server_version;
}

async function getSQLMaxConnection() {
  const queryResult = await database.query("SHOW max_connections;");
  return parseInt(queryResult.rows[0].max_connections);
}

async function getSQLConnectionUsed() {
  const databaseName = process.env.POSTGRES_DB;
  const queryResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  return queryResult.rows[0].count;
}
