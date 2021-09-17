Para criar um projeto com NPM

Na pasta do projeto deve executar os seguintes comandos.

npm init -> (para criar o arquivo package.json, e assim tornar um projeto node.js);
npm install express --save -> (para instalar as dependencias do pacote express para usar o protocolo http e salvar as dependencias);

npm install nodemon@1.18.4 --save-dev --save-exact

//quando vc executa o install de um modulo com @1.2.12 o node vai instalar o modulo nessa versao especifica
//o comando --save-dev serve para dizer ao node que esta é uma dependencia apenas de desenvolvimento, não é 
//necessaria para a aplicacao rodar
//o comando --save-exact serve pra dizer ao node pra instalar exatamente a versao que vc especificou
//o modulo nodemon é um utilitário que irá monitorar todas as alterações nos arquivos de sua aplicação 
//e reiniciar automaticamente o servidor quando for necessário