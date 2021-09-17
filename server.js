const app = require('./src/config/custom-express');

app.listen(3000, function(){
    console.log("servidor rodando na porta 3000");
});


// const http = require('http');

// const servidor = http.createServer(function(requisicao, resposta){
    // let html = '';
    // if (requisicao.url =='/'){
        // html = '<html><head><meta charset="UTF-8"></head><body><h1>Teste Servidor Node JS</h1></body></html>';
    // }else if (requisicao.url == '/livros'){
        // html = '<html><head><meta charset="UTF-8"></head><body><h1>Lista de Livros</h1></body></html>';
    // }
    // resposta.end(html);
// });

// servidor.listen(3000); //convenção node ser na porta 3000;