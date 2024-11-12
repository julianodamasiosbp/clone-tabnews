function Home() {
    return <html>
    <head>
    <script>
        let contador = 0;
        add(){
            this.contador += 1
        }
        document.getElementById("contador").innerHTML = contador;
    </script>
    <title>Contador</title>
    </head>
    
    <body>
      <p>Botão para acionar o contador:</p>
      <button type="button" onclick="add()">+</button>
      <p id="contador"></p>
    </body>
    
    </html>
}

export default Home;