import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";
  let databaseVersion;
  let databaseMaxConnection;
  let databaseOpenedConnection;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    databaseVersion = data.dependencies.database.version;
    databaseMaxConnection = data.dependencies.database.max_connections;
    databaseOpenedConnection = data.dependencies.database.opened_connections;
  }

  return (
    <>
      <div>
        <h3>Database:</h3>
        <p>Versão: {databaseVersion}</p>
        <p>Conexões Máxima: {databaseMaxConnection}</p>
        <p>Conexões Abertas: {databaseOpenedConnection}</p>
      </div>
      <h4>Última atualização: {updatedAtText}</h4>
    </>
  );
}
