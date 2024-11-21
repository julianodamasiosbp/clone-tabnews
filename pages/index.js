import { useState } from "react";

function Home() {
  const [mensagem, setMensagem] = useState("");

  function revelarMensagem() {
    setMensagem("Eu te amo!!! 😍");
  }
  return (
    <div>
      <head>
        <title>Mensagem Misteriosa</title>
      </head>

      <body>
        <p>Ellen, clique no botão para revelar uma mensagem:</p>
        <button type="button" onClick={revelarMensagem}>
          Mostrar!
        </button>
        <p>{mensagem}</p>
      </body>
    </div>
  );
}

export default Home;
