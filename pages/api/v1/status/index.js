import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const postgreeVersion = versionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const openConnectionsResult = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity where datname = 'local_db';",
  );

  const openConnections = openConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependency: {
      database: {
        version: postgreeVersion,
        max_conections: parseInt(maxConnections),
        open_connections: openConnections,
      },
    },
  });
}

export default status;
