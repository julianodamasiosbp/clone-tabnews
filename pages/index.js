import { useState } from "react";
import Head from "next/head";

function Home() {
  const [mensagem, setMensagem] = useState("");

  function revelarMensagem() {
    setMensagem("Eu te amo!!! 😍");
  }
  return (
    <>
      <Head>
        <title>Mensagem Misteriosa</title>
      </Head>

      <div>
        <p>Ellen, clique no botão para revelar uma mensagem:</p>
        <button type="button" onClick={revelarMensagem}>
          Mostrar!
        </button>
        <p>{mensagem}</p>
      </div>
    </>
  );
}

export default Home;
