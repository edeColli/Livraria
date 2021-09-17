//essa sintaxe modeulo.exports = () =>
//esta exportando o module rotas com uma Arrow function anonima
//dentro dessa arrow function ela recebe o parametro app para poder ser utilizado com o metodo get do http
//e devolver a requisicao para o usuario no browser;
const LivroDAO = require('../infra/livro-dao');

const db = require('../../config/database'); //retorna a instancia do banco de dados;

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });
 
    app.get('/livros', function(requisicao, resposta) {

        const livroDao = new LivroDAO(db);
        livroDao.listar()
                .then(livros => resposta.marko(
                    require('../../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
    });

    // app.get('/livros', function(requisicao, resposta) { 

    //     const livroDao = new LivroDAO(db);
    //     livroDao.listar()
    //         .then(livros => resposta.marko(
    //             require('../../views/livros/lista/lista.marko'),
    //             {
    //                 livros: livros
    //             }
    //         ))
    //         .cath(erro => console.log(erro))
    // });           
        // livroDao.listar(function(erro, resultados) {
        //     resposta.marko(
        //         require('../../views/livros/lista/lista.marko'),
        //         {
        //             livros: resultados
        //         }
        //     );
        // });

        // db.all('SELECT * FROM livros', function(erro, resultados){
        //     resposta.marko(
        //         require('../../views/livros/lista/lista.marko'),{
        //             livros: resultados
        //         }
        //     );
        // });

        // resposta.marko(
        //     require('../../views/livros/lista/lista.marko'),{
        //         livros:[
        //             {
        //                 id: 1,
        //                 titulo: 'Fundamentos do Node'
        //             },
        //             {
        //                 id: 2,
        //                 titulo: 'Node for dummies'
        //             },
        //             {
        //                 id: 3,
        //                 titulo: 'Node avançado'
        //             }
        //         ]
        //     }
        // );
    
    app.get('/livros/form', function(requisicao, resposta){
        resposta.marko(require('../../views/livros/form/form.marko'),{ livro: {} });
    });

    app.get('/livros/form/:id', function(requisicao, resposta) {
        const idLivro = requisicao.params.id;
        const livroDao = new LivroDAO(db);
    
        livroDao.buscaPorId(idLivro)
                .then(livro => 
                    resposta.marko(
                        require('../../views/livros/form/form.marko'),
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
    });

    app.post('/livros', function(requisicao, resposta){
        console.log(requisicao.body);
        const livroDao = new LivroDAO(db);

        livroDao.adicionar(requisicao.body)
                .then(resposta.redirect('/livros'))
                .cath(erro => console.log(erro))
    });

    app.put('/livros', function(requisicao, resposta){
        console.log(requisicao.body);
        const livroDao = new LivroDAO(db);

        livroDao.atualizar(requisicao.body)
                .then(resposta.redirect('/livros'))
                .cath(erro => console.log(erro))
    });

    app.delete('/livros/:id', function(requisicao, resposta){
        const idLivro = requisicao.params.id;

        const livroDao = new LivroDAO(db);

        livroDao.remover(idLivro)
                .then(() => resposta.status(200).end())
                .cath(erro => console.log(erro))
    });
}
