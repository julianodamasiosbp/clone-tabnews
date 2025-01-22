import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });
  response.status(500).json(publicErrorObject);
}

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
