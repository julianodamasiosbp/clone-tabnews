import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if(request.method !== 'GET' && request.method !== 'POST') {
    return response.status(405).end();
  }
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: getMethod(request.method),
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  response.status(200).json(migrations);
}

function getMethod(method) {
  return method === "GET" ? true : false;
}
