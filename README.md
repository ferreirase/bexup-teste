## O desafio
  Criar uma API para a entidade de documentos, com as seguintes rotas:

    1. POST /api/documents - Receber o upload de um novo documento/arquivo

    2. GET /api/documents - Listar todos os documentos recebidos
    
    3. GET /documents/nome-do-arquivo.extensão - Acessa um arquivo específico no servidor
    
    
  ## Entregáveis

  • Receber arquivos PDF, PNG e JPG

  • Validar arquivos de até 20MB

  • Os arquivos recebidos podem ser armazenados em um diretório temporário da aplicação.

  Extrair e armazenar em um local temporário o máximo de informações do arquivo enviado, como
  data de envio, tamanho do arquivo, número de páginas, etc.

  • Criar um filtro de busca, uma query que recebe uma string e filtra os documentos encontrados
  pelo nome, independente de letras maiusculas, minusculas e acentos.

  • Retornar o máximo de informaçõess do arquivo, número de páginas, tamanho, extensão, nome
  original, data do envio do upload


## Subindo o servidor
  1. Clone/Baixe este repositório na sua máquina;

  2. Se tiver o *``` docker-compose ```* instalado, abra o terminal na raiz da pasta do projeto e rode o comando *``` docker-compose up --build ```* para subir o servidor do projeto;

  2. Se não tiver o *``` docker-compose ```* instalado, abra o terminal na raiz da pasta do projeto e rode os comandos *``` yarn install ```* ou *``` npm install ```* para instalar as dependências do projeto e depois o comando *``` yarn start:dev ```*  ou *``` npm run start:dev ```* para subir o servidor;

  4. Pronto, seu servidor backend está no ar e pronto pra ser acessado no endereço *``` http://localhost:3000 ```* ou na porta configurada no arquivo *``` .env ```*.


## Rotas e Parâmetros

``` /api/documents ```
```
- Verbo: GET
- Rota para listar todos os documentos cadastrados;
- Parâmetros: ?title=string (opcional, serve para busca de documento por título);
- Retorno: um array de documentos ou um array vazio;
```


``` /api/documents ```
```
- Verbo: POST
- Rota para listar todos os documentos cadastrados;
- Body: { type: multipart/form-data, name: 'file' };
- Retorno: um objeto com as informações do novo documento criado ou um erro de validação;
```


## Testando
  O comando *``` yarn test ```* ou *``` npm run test ```* roda os testes configurados para a aplicação;
  

## Tecnologias Utilizadas no Projeto

| **Backend**|
|----------- |
| *NodeJS*   |
| *Express*    |
| *TypeScript* |
| *Jest*    |
| *NestJS* |
| *Eslint*     |
| *Prettier*  |
| *Docker*    |
