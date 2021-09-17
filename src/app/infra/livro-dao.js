class LivroDao{

    constructor(db) {
        this._db = db;
    }

    adicionar(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`insert into livros (titulo, preco, descricao) values (?,?,?)`,
                [livro.titulo, livro.preco, livro.descricao],
                (erro) =>{
                    if (erro){
                        return reject("Não foi possível adicionar o livro");
                    }

                    resolve();
                }    
            )
        });
    }

    listar(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => { 
                    if (erro){ 
                        return reject("Não foi possível listar os livros");
                    }
                    return resolve(resultados);
                }
            )
        });
    }

    
    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM livros WHERE id = ?`,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualizar(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros 
                             SET titulo = ?,
                                 preco = ?,
                                 descricao = ?
                           WHERE id = ?
            `,
            [livro.titulo, livro.preco, livro.descricao, livro.id],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remover(id) {

        return new Promise((resolve, reject) => {
            this._db.get(`DELETE FROM livros WHERE id = ?`,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
    // listar(callBack){
        // this._db.all(
        //     'SELECT * FROM livros',
        //     (erro, resultados) => callBack(erro, resultados)
        // )
    // }
}

module.exports = LivroDao;