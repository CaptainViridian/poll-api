# Poll API
Este projeto é uma resolução do desafio da MadeiraMadeira. A documentação para os endpoints pode ser encontrada [aqui](doc/).


## TL; DR
### Pré requisitos
Tenha instalado:
- Node.js
- npm
- Docker

Execute o seguinte comando para renomear o arquivo .env:
```bash
mv .env.example .env
```

Execute o seguinte comando para instalar as dependências e construir a imagem do contêiner Docker :
```bash
npm i && npm run compose:build
```
### Executando
Para rodar a API execute o seguinte comando:
```bash
npm run compose:up
```
O comando levanta um contêiner docker para o banco de dados e outro para a API, em modo desenvolvimento. As imagens necessárias serão baixadas caso não existam.

A API pode ser acesssada em `localhost:9001`

## Stack
Foram utilizadas as seguintes tecnologias e ferramentas:

- **Node.js** como ambiente de execução JavaScript
	- **dotenv** para abstração de variáveis de ambiente
	- **esm** como *module loader*
	- **JsonWebToken** para autenticação e autorização*
- **MongoDB** como banco de dados
	- **Mongoose** como camada de abstração para modelagem de entidades
- **Docker + Docker Compose** para criação de contêineres de desenvolvimento e produção
- **Webpack** para minificação e otimização da build de produção
- **Mocha** como framework de testes
	- **Chai** como biblioteca de asserção BDD

###### *Apesar de as rotas de autorização e autenticação serem funcionais, o serviço que realiza a verificação é um mockup

## Variáveis de ambiente e arquivo dotenv
As configurações principais da API são acessadas através de variáveis de ambiente. Foi utilizado o pacote node [dotenv](https://www.npmjs.com/package/dotenv), que utiliza um arquivo .env para definir variáveis de ambiente padrão, únicas para a aplicação. As variáveis definidas nesse arquivo sobrescrevem as variáveis do sistema e são sobrescritas pelas da linha de comando, se estas forem declaradas.

Para definir as variáveis desse arquivo, copie ou renomeie o arquivo [.env.example](.env.example) para .env e altere os valores necessários.

As seguintes variáveis são utilizadas (em parênteses os valores que assumem caso não sejam definidas):

- `ENV`: Define o ambiente em que a API está rodando [dev/test/production] (dev)
- `MONGO_PREFIX`: [Prefixo da string de conexão com o MongoDB]([https://docs.mongodb.com/manual/reference/connection-string/#connections-dns-seedlist](https://docs.mongodb.com/manual/reference/connection-string/#connections-dns-seedlist)) [mongodb/mongodb+srv] (mongodb)
- `DB_NAME`: Nome da database do MongoDB; varia automaticamente de acordo com o ambiente (-dev/-test/-production)
- `DB_HOST`: Endereço IP do Host, local ou remoto, da database
- `DB_USER`: User do MongoDB
- `DB_PASSWORD`: Senha do MongoDB
- `DB_PORT`: Porta de acesso, caso necessário; deixar o valor inalterado caso rode no Docker.
- `DB_CONNECTION_QUERY_STRING`: Query String da URI de conexão com o MongoDB, caso necessário
- `API_HOST`: Endereço IP do Host, local ou remoto, da API; deixar o valor inalterado caso rode no Docker (0.0.0.0)
- `API_PORT`: Porta para API; deixar o valor inalterado caso rode no Docker (9001)
- `SECRET`: Segredo utilizado para gerar JWT

A função `dotenv()` falha silenciosamente; caso alguma variável não seja declarada no arquivo, ela buscará no ambiente ou a deixará indefinida.

## Banco de Dados
A aplicação supõe a utilização de uma instância remota do MongoDB (recomenda-se o uso do [MongoDB Atlas]([https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))), mas também é possível utilizar uma instalação local se desejado.

### Desenvolvimento
A execução do modo desenvolvimento através do Docker lança por padrão uma instância do MongoDB em um contêiner*. Não é necessário alterar os valores no arquivo .env.

Também é possível utilizar uma instância local ou remota, se desejado. Nesse caso é necessário alterar as respectivas variáveis no arquivo .env. (Atente-se para a separação entre as redes do localhost e do contêiner da API, caso ela esteja rodando em um).

Caso deseje utilizar uma instância local ela deve, naturalmente, ser instalada. As instalações diferem um pouco entre as diferentes distribuições do Linux. Aqui você encontra as instruções para instalação no [Ubuntu]([https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)), [Debian]([https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/)) e [CentOS/Red Hat]([https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)). Entretanto, para praticidade, recomenda-se utilizar a versão do contêiner Docker.
###### *Por questões de praticidade, esse contêiner está configurado para utilizar um diretório dentro da pasta do projeto (./db/data) como volume do armazenamento. Caso necessário, atente-se às permissões do diretório.
### Teste
A base de testes pode utilizar a mesma instância da base de desenvolvimento, não sendo necessário alterar o arquivo .env. O nome da base no MongoDB é ajustado pelo programa.

### Produção
A execução do modo de produção pelo Docker não inclui uma instância do MongoDB (baseado nas instruções do desafio, supõe-se a utilização de uma instância separada da aplicação global), de modo que o acesso deve ser configurado no arquivo .env.

## Executando

### Preparação
Tenha instalado:
- Node.js
- npm
- Docker

Renomeie o arquivo .env.example para .env e altere o arquivo de acordo com as [instruções](#variáveis-de-ambiente-e-arquivo-dotenv) (alternativamente pode-se também definir as variáveis de ambiente no sistema utilizado):
```bash
mv .env.example .env # ou cp .env.example .env
```

Execute o seguinte comando para instalar as dependências:
```bash
npm install # ou npm i
```


### Desenvolvimento
Para executar a aplicação, primeiramente construa as imagens Docker do Node.js e do MongoDB através do Docker-Compose:
``` bash
npm run compose:build
```
Em seguida suba os contêineres:
```bash
npm run compose:up
```
A aplicação será executada dentro do contêiner no modo desenvolvimento através do [script](#comandos) `nodemon:dev`.

#### Sem Docker
É possível executar a aplicação diretamente no Node.js. Para isso, execute:
```bash
npm run nodemon:dev # ou node index.js
```
###### *Observe que, dessa forma, é necessário configurar uma instância do MongoDB e apontar para ela através das variáveis de ambiente

### Testes
Para rodar os testes, basta executar o script:
```bash
npm run test
```
###### *É necessário ter configurado uma instância *local* do MongoDB. Se houver uma instância da aplicação rodando no contêiner do Docker, não é necessária nenhuma configuração adicional.
###### **Observe que não é necessário alterar as variáveis de ambiente `ENV`, `DB_HOST` e `API_PORT`. Isso é feito pelo script.

### Produção

Para executar a aplicação no modo produção, após clonar o projeto no servidor desejado e realizar a [preparação](#preparação), execute o comando:
```bash
npm run deploy
```
Esse comando realiza o build da aplicação e da imagem do contêiner Node.js e sobe um contêiner com a aplicação em execução. Se algum erro parar a aplicação, o contêiner se reinicia por padrão.

#### Sem Docker
Se preferir executar a aplicação no próprio servidor ou apenas construir a versão otimizada, siga esses passos:

Gerando a versão otimizada da aplicação:
```bash
npm run build
```
Executando:
*Com node*
```bash
npm start # ou node dist/index.js
```
*Com pm2*
```bash
npm i -g pm2 # superusuário pode ser necessário
pm2 start --name poll-api dist/index.js --watch=true

# se desejar autostart com boot
pm2 save
pm2 startup # copie e execute o comando que for apresentado
```

###### * Independente da forma escolhida para rodar a aplicação, certifique-se de que a variável de ambiente `ENV` está configurada como `production`.

### Comandos
- `build`: Utiliza o Webpack para criar uma versão otimizada da aplicação e salva no diretório ./dist
- `deploy`: Gera a versão de produção da aplicação e a executa em um contêiner Docker
- `compose:build:prod`: Gera a imagem Docker para o contêiner da API
- `compose:build`: Gera as imagens Docker para os contêineres da API e do MongoDB
- `compose:up`Sobe contêineres da API no modo desenvolvimento executando com nodemon e do MongoDB
- `compose:down` Para qualquer contêiner em execução no diretório
- `start`: Executa a aplicação presente em ./dist
- `start:dev`: Executa o comando `compose:build` e em seguida `compose:up`
- `nodemon:dev`: Executa a API em modo desenvolvimento com nodemon
- `test`: Executa os testes

## Troubleshooting
- Se utilizar o MongoDB Atlas (ou outro serviço de DaaS), atente-se à Query String fornecida na URI de conexão. [Por alguma razão](https://stackoverflow.com/a/60543052/10525338), é possível que a posição das propriedades cause um erro na aplicação. Certifique-se de que a propriedade `w` venha antes da propriedade `retryWrites` e qualquer outra que seja adicionada.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoiZXh0ZW5zaW9uczpcbiAgcHJlc2V0Oi
BnZm1cbiIsImhpc3RvcnkiOlsxOTAyNDQ3NDQxXX0=
-->
