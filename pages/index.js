import { useState } from 'react';

function Home() {
    const [contador, setContador] = useState(0);

    function add() {
        setContador(contador + 1);
    }
    return (
        <div>
            <head>
                <title>Contador</title>
            </head>
            
            <body>
                <p>Botão que aciona o contador:</p>
                <button type="button" onClick={add}>+</button>
                <p id="contador">{contador}</p>
            </body>
        </div>
    );
}

export default Home;