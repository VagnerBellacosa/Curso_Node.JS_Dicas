# Criando serviço de microblog com Node.js

## Veja nesse artigo como criar um serviço de microblog utilizando os recursos da plataforma mais famosa em escalabilidade front-end, o NodeJS.

Por que eu devo ler este artigo: Nesta publicação serão descritos os **principais conceitos da plataforma Node.js**, sua aplicabilidade e um breve tutorial para elaboração de um aplicativo de micro blog, demonstrando todo o potencial da biblioteca Express e de outros módulos que são utilizados rotineiramente no desenvolvimento de sistemas de protocolo HTTP.

Em que situação esse tema é útil: Este tema é útil para a elaboração de aplicações ou módulos de sistemas que estejam sujeitos à sobrecarga de acessos ou de processamento, visando evitar que sejam necessárias melhorias de hardware para suportar a carga da aplicação. Além de atender a necessidade da implementação de um sistema em tempo real, através de uma conexão bidirecional (ou keep-alive)

### Conhecendo no Node.js

Para aqueles que não conhecem ainda a **plataforma Node.JS**, à primeira vista pode parecer que se trata de mais uma biblioteca JavaScript para uma série de soluções e facilidades no front-end de websites, tal como o jQuery, o Dojo, dentre outros. Mas na verdade o **Node.JS se trata de uma plataforma server-side** que promete reduzir a carga de processamento na máquina do servidor através de uma arquitetura que atende a todas as requisições feitas ao servidor de forma que não ocorram bloqueios de I/O e livre de deadlocks. Além disso o **Node.js permite um maior controle do servidor por parte do desenvolvedor** por este se tratar de uma plataforma em linguagem baixa.

Em comparação com os servidores comuns, em cada conexão, é alocado um espaço de memória. As requisições de cada usuário são enfileiradas e processadas na devida ordem, o que gera certo atraso na resposta da requisição, porque as requisições não são processadas em paralelo, ou seja, o servidor por sua vez é sobrecarregado e a eficiência do serviço ou sistema é comprometida, isto no caso de um aumento de tráfego e normalmente este problema é contornado adicionando mais servidores ou adicionando mais recursos de hardware para aumento da memória e maior capacidade de processamento.

Para solucionar este tipo de problema, foi *criado o Node.JS*, uma plataforma de software criada em 2009 por Ryan Dahl através do uso da engine V8 JavaScript. **A principal vantagem do Node.JS é exatamente o processamento das requisições não se bloquearem e não entrarem em uma fila de processamento**. Isso acontece porque cada nova conexão ao servidor irá criar um novo processo isento de qualquer alocação de espaço na memória. Logo, o sistema tem um tempo de resposta muito mais ágil e economia no uso do hardware e melhor aproveitamento do processamento do servidor. Devido à arquitetura orientada a eventos do JavaScript cada processo do server-side será disparado também através de eventos, mas desta vez não serão eventos onClick ou load, mas sim através de eventos de conexão, de requisição, dentre uma série de outras possibilidades.

**Pelo fato do Node.js suportar os mais diversos protocolos como SSH, FTP, SMTP, DNS e dentre outros**, as possibilidades de *desenvolvimento do Node se estendem desde aplicações web simples* no protocolo HTTP até servidores para jogos multiplayer. O Node.js a partir da sua versão 0.6.3 passou a incluir de forma nativa o seu instalador de dependências, o NPM (Node Package Manager), um sistema auxiliar que ao ler o arquivo package.json, que contém as referências do projeto devidamente listadas, realiza o download de cada uma das dependências.

<iframe width="560" height="315" src="https://www.youtube.com/embed/KD2kJetfzas" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="outline: none; -webkit-tap-highlight-color: transparent; max-width: 100%; margin: auto; height: 455.062px; width: 809px;"></iframe>

[Curso de Node.js: Primeiros passos](https://www.devmedia.com.br/curso/curso-de-node-js-primeiros-passos/1482)

### Preparando o ambiente

Para começarmos nosso desenvolvimento vamos inicialmente instalar o Node.js e logo após o NPM e o banco de dados que utilizaremos neste artigo, no caso, o MongoDB. Para este, iremos utilizar a versão 0.10.21, a mais recente até a data da redação deste artigo.

Para **instalar o Node.js** nos sistemas operacionais Mac OS e Windows basta acessar o site oficial do Node.js (na seção **Links**), baixar o instalador para o seu sistema operacional e executá-lo.

Mas para o caso do Linux, há outra forma para instalá-lo, no caso da distribuição Ubuntu, versão 13, ele vem por padrão no apt-get com a versão 0.6 (um pouco desatualizada para este artigo) para isto então se deve executar os comandos apresentados na **Listagem 1**.

**Listagem 1**. Sequência de comandos para a **instalação do Node.js** no Linux.

```
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

Caso a sua instalação não tenha sido bem sucedida ou você *prefira instalar o NodeJS* pelo gerenciador de pacotes do Linux nas mais diferentes distribuições, todos os sites com as informações de download podem ser encontradas na seção **Links**.

Antes de configurar o ambiente, verifique se o *Node.js foi instalado com sucesso*, para isto, acesse o terminal (ou prompt) e execute o comando node -v que em resposta ao programa irá retornar a versão instalada do Node.js, como demonstrado na **Figura 1**.

![Verificando versão instalada do Node.js](https://arquivo.devmedia.com.br/revistas/front_end/imagens/3/image002.png)**Figura 1**. Verificando versão instalada do Node.js.

Se tudo deu certo, vamos fazer um teste no REPL (Read Eval Print Loop), ou seja, um interactive shell similar ao irb do Ruby, um sistema interativo que executa as linhas de código inseridas no terminal. Primeiro, escreva node no terminal, tecle enter e insira o seguinte comando:

```
console.log("Olá NodeJS");
```

E tecle enter, o programa irá responder com a mensagem “Olá Node.js” e para sair do REPL tecle **ctrl + c**.

[Meteor.js: Construindo aplicações web com Node.js e MongoDB](https://www.devmedia.com.br/meteor-js-construindo-aplicacoes-web-com-node-js-e-mongodb/32953)

Após a instalação, deve-se configurar a variável de ambiente no seu sistema operacional (isto vale para Windows, MAC OS e Linux), no caso do MAC OS e o Linux basta configurar o arquivo .bash_profile ou .bashrc (acessível de dentro do diretório home e caso o arquivo ainda não exista, você deverá cria-lo) e adicionar a seguinte linha ao final do arquivo:

```
NODE_ENV="development"
```

Já no Windows, a configuração da variável de ambiente se dá da seguinte forma:

- Clique em iniciar;
- Com o botão direito selecione a opção “Computador”;
- Na janela de configurações, dentro da seção de “Nome do computador (...)” clique em “Alterar Configurações”;
- Selecione a aba “Avançado” e clique no botão “Variáveis de ambiente”;
- Abaixo da box “Variáveis do Sistema” clique em “Novo” e preencha o campo Nome da variável com “NODE_ENV” e o campo “Valor da variável” com “development”.

Após a execução deste passo a passo o Windows já está preparado para o desenvolvimento em Node.js!

### Criando o primeiro servidor

Antes de começarmos com o projeto principal vamos antes criar uma pequena aplicação para entendermos como é feita a instanciação de um **servidor HTTP com Node.js**. Antes crie um diretório, onde preferir, para armazenarmos os nossos projetos e crie um diretório para este projeto, chamando-o de PrimeiraAplicacao e em seguida crie um arquivo chamado app.js dentro dele com o conteúdo apresentado na **Listagem 2**.

**Listagem 2**. Primeiro script de um servidor HTTP simples.

```
var http = require('http');
  var server = http.createServer(function (req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(“<h1>Seja bem-vindo!</h1>”);
        res.end();
  });
  server.listen(1337);
```

Salve o arquivo, abra o terminal (ou prompt) e acesse através do terminal o diretório onde o arquivo foi salvo. Execute o arquivo e inicialize o servidor HTTP, basta digitar o seguinte comando no terminal:

```
node app.js
```

Logo após abra o seu navegador e vamos acessar o seguinte endereço: http://localhost:1337/ para verificar se o resultado será semelhante ao apresentado na **Figura 2**.

![Resultado da implementação de um servidor HTTP simples](https://arquivo.devmedia.com.br/revistas/front_end/imagens/3/image003.png)**Figura 2**. Resultado da implementação de um servidor HTTP simples.

Ao analisar o código da implementação deste pequeno servidor, percebe-se na primeira linha a importação do módulo HTTP para a criação de um servidor que atenda a este protocolo. Logo após declara-se uma variável server e a esta variável é atribuído o resultado do método createServer do objeto HTTP, este método é alimentado pelas variáveis de requisição e resposta (req e res, respectivamente) e no conteúdo do call-back inicia-se a escrita da resposta. No início, é escrito o cabeçalho da resposta atribuindo um código de resposta 200, representando sucesso na requisição, e o tipo de resposta, neste caso, texto HTML. Em seguida escrevemos o conteúdo que aparecerá na tela, a mensagem “Seja bem-vindo” e logo após é definido o fim da transmissão de dados através do método end. Finalmente, é atrelada a função listen, que fará o acionamento da função do servidor caso alguma requisição chegue à porta que foi inserida no parâmetro da função listen.

Porém neste primeiro exemplo, não foi explorado o objeto de requisição recebido pelo servidor, no próximo exemplo este parâmetro será mais explorado, para isto, interrompa a execução do primeiro script no terminal pressionando ctrl + c (ou command + c) e altere o arquivo app.js tal como na **Listagem 3**.

**Listagem 3**. Adicionando suporte a URLs ao servidor HTTP.

```
var http = require('http');
var server = http.createServer(function(req, res){
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      if(req.url == "/"){
            res.write("<h1>Ola Node.js</h1>");
      }else if(req.url == "/outra/"){
            res.write("<h1>Outra página</h1>");
      }else{
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.write("<h1>Página não encontrada</h1>");
      }
      res.end();
});
  server.listen(1337);
```

Ao finalizar salve o arquivo, retorne ao terminal e execute novamente o código no terminal:

```
node app.js
```

Ao executar, vá até o navegador e acesse o endereço http://localhost:1337/ para receber a mensagem de boas-vindas como visto no exemplo anterior, logo após acesse o endereço http://localhost:1337/outra/ para receber a mensagem “Outra página” e por último insira uma URL inexistente tal como http://localhost:1337/erro/ para ter o retorno da página de erro previamente escrita, o resultado deve ser como apresentado na **Figura 3**.

![Página de erro apresentado pelaaplicação](https://arquivo.devmedia.com.br/revistas/front_end/imagens/3/image004.png)**Figura 3**. Página de erro apresentado pela aplicação.

Em análise, nota-se que agora o código conta com três estruturas condicionais realizando uma verificação no atributo URL do objeto req, este atributo traz apenas o path da requisição (Por exemplo: http://www.site.com.br/caminho/do/path retorna o valor /caminho/do/path/), dentro do objeto de requisição encontramos outros atributos para exibir mais valores específicos da URL.

### Criando um Microblog

Para auxiliar no aprendizado desta plataforma, **será criado um passo a passo de uma aplicação web simples de microblog similar ao Twitter**, com algumas funções limitadas. E para isto será utilizado o framework Express versão 3.4.4, logo que a atividade de desenvolvimento de uma aplicação HTTP deste porte pode se tornar uma atividade muito desgastante. **Também será utilizado o banco de dados no-SQL MongoDB devido a sua fácil integração com o Node.js**.

Para iniciar abra o terminal (ou prompt) e execute o código:

```
npm install –g express@3.4.4
```

No Linux é necessário executar este código no modo sudo (insira a notação sudo antes do comando). Logo após executar o código e a instalação ser finalizada, é necessário reiniciar o terminal para que as alterações surtam efeito no ambiente de desenvolvimento. Ao reiniciar o terminal é necessário acessar através do mesmo diretório onde se deseja implementar o projeto (escolha um a seu gosto) e em seguida execute o código no terminal:

```
express nwitter
```

Quando o código é executado, a saída do programa será similar a **Figura 4** em seu terminal.

![Saída gerada pelo Express ao criar um projeto](https://arquivo.devmedia.com.br/revistas/front_end/imagens/3/image005.png)**Figura 4**. Saída gerada pelo Express ao criar um projeto.

Após executar o comando, é criada uma estrutura de diretórios do projeto Express, esta estruturação é padrão do próprio framework. Para concluir a criação acesse através do terminal o diretório que foi criado. Por fim, execute o seguinte comando:

```
npm install
```

Quando o projeto foi gerado, o package.json já foi criado com duas dependências: o Express propriamente dito e o Jade, um template engine que utiliza notações mais diretas e identação na geração de tags HTML. Isto fará com que todas as dependências sejam instaladas no projeto. Acessando o diretório do projeto pode-se perceber a seguinte estrutura de diretório e arquivos:

- app.js – Arquivo principal do projeto, onde o servidor será instanciado e inicializado;
- package.json – Todas as informações do projeto e suas dependências são comtempladas neste arquivo, tal como, o nome do projeto, versão, autor, licença, e dentre várias outras informações. (**Links**);
- /node_modules/ – Diretório onde todas as dependências ficam alocadas;
- /public/ – Local padrão para armazenar imagens, scripts, folhas de estilo e etc.;
- /routes/ - Todos os scripts de rotas são guardados neste diretório;
- /views/ - Onde devemos armazenar todos os arquivos da camada de view do projeto, scripts que geram o layout.

Porém, para o projeto também é necessário criar dois diretórios um para todos os controles e outro diretório para armazenar todos os modelos, portanto, acesse o diretório do projeto e crie um diretório controllers e outro models. Antes de começar a construir o projeto deve-se antes de tudo preencher o arquivo package.json com os dados corretos para o projeto, altere-o de forma que se assemelhe a **Listagem 4**.

**Listagem 4**. Arquivo package.json

```
{
  "name": "nwitter",
  "description": "Minha primeira aplicação NodeJS",
  "autor": "Seu Nome <seu@email.com>",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.4.4",
    "jade": "*"
  }
}
```

Mas para este tutorial o Jade será substituído pelo EJS, por ser um template engine que utiliza HTML e tags especiais para o código JS, bastante similar ao PHP. E para isto é necessário desinstalar as dependências do Jade, abra o arquivo package.json em um editor de código e exclua a linha que faz referência ao Jade (atenção para a vírgula após a referência do Express, ela também deve ser removida), conforme apresentado na **Listagem 5**.

**Listagem 5.** Removendo o Jade da lista de dependências.

```
…
  "dependencies": {
        "express": "3.4.4"
  }
…
```

E agora serão removidos os velhos templates gerados pelo Jade, acesse o diretório views no diretório do projeto e exclua todos os arquivos dentro dele. Note que os arquivos do Jade ainda estão instalados no diretório node_modules, e estes arquivos passaram a ser inúteis no projeto gerado; para remover os arquivos da dependência acesse o terminal e execute o código:

\>

```
npm uninstall jade
```

E substituiremos o Jade pelo EJS, para isto é necessário alterar novamente o arquivo packages.json com a dependência do EJS, na **Listagem 6** está descrito o trecho referente as dependências do sistema.

**Listagem 6**. Declarando o EJS na lista de dependências.

```
…
  "dependencies": {
        "express": "3.4.4",
        “ejs”: “*”
  }
…
```

Novamente será executado o código para que o NPM realize a instalação do EJS:

```
npm install
```

Agora que tudo já está pronto para se iniciar a construção do aplicativo é necessário remover alguns trechos de código do arquivo app.js que foram automaticamente gerados pelo Express, alguns deles não são interessantes no estágio inicial de desenvolvimento e podem atrapalhar no entendimento da aplicação. Na **Listagem 7** o arquivo app.js foi editado de forma que fossem eliminados alguns recursos que não serão utilizados nos estágios iniciais da aplicação.

**Listagem 7**. Adicionando suporte ao EJS no arquivo app.js.

```
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

E antes de iniciar deve-se criar o template da página index, logo que o arquivo index.jade foi removido posteriormente. Dentro do diretório views crie o arquivo index.ejs similar ao conteúdo apresentado na **Listagem 8**.

**Listagem 8**. Template da página de boas vindas.

```
<DOCTYPE html>
<html>
      <head>
            <meta charset='utf-8' />
            <title>Nwitter - Twitter com NodeJS</title>
      </head>
      <body>
            <h1>Seja bem-vindo</h1>
      </body>
</html>
```

Precisa-se neste estágio realizar um teste para verificar se todos os elementos foram instalados e se o ambiente está configurado corretamente, basta executar o seguinte comando no terminal (lembre-se de sempre finalizar o último script que estava em execução pressionando **ctrl + c** (caso você não tenha muita experiência com o terminal do seu sistema operacional, leia a **BOX 1** para entender melhor sobre a finalização dos seus scripts):

```
node app.js
```

**BOX 1**. Finalizando scripts da forma correta

É possível que algumas vezes o desenvolvedor entre um teste de script e outro finalize a execução do script acidentalmente com o comando ctrl + z, isto na verdade faz com que o script continue em execução mas o usuário pode continuar sua interação no terminal, e ao tentar novamente executar o script haja um conflito de porta do servidor. Caso isto venha acontecer o usuário esteja em um ambiente Linux ele deve executar o comando fg para suspender qualquer processo que esteja em execução em segundo plano.

A saída esperada deverá ser igual à **Figura 5**.

![Saída esperada da primeira iteração do projeto]()**Figura 5**. Saída esperada da primeira iteração do projeto.

Para a próxima iteração neste projeto será criada uma tela de login do usuário para melhor entendimento da dinâmica de desenvolvimento do Node.js e para que o projeto comece a ser organizado. Logo é necessário primeiramente criar um controller para a entidade usuário, portanto, crie um arquivo chamado usuario.js dentro do diretório /routes/ com o seguinte conteúdo:

```
exports.login = function(req, res){ res.render('usuario/login'); };
```

**NOTA**: Vamos aproveitar para apagar o arquivo user.js que vem por padrão com express, pois não vamos utilizar este arquivo de rotas.

Ou seja, foi declarada uma função login que por sua vez irá trazer a view login dentro do diretório /views/usuario/, esta view será criada posteriormente. Mas antes é necessário comtemplar esta rota dentro do arquivo routes para que o sistema entenda que quando o usuário fizer uma requisição na URL /usuario/login a resposta deverá ser uma página com um formulário de login, conforme a **Listagem 9**, o arquivo app.js deve conter as novas rotas que a aplicação suportará.

**Listagem 9**. Modificando as rotas da aplicação.

```
…
  var routes = require('./routes');
  routes.usuario = require('./routes/usuario');
  …
  app.get('/', routes.index);
  app.get('/usuario/login', routes.usuario.login);
…
```

Pode-se perceber que foi utilizado o próprio objeto routes para armazenar as rotas de usuário e que posteriormente o objeto usuario com todas as rotas irá chamar o método login ao ser requisitada a URL /usuario/login. Como próximo passo é necessário criar a view da página de login. Para uma melhor organização dos templates, dentro do diretório /views/ crie um diretório chamado usuario e dentro dele crie um arquivo ejs chamado login. Para também evitar a repetição em todos os templates do sistema cabeçalho e o rodapé, deve-se separá-los em arquivos distintos e realizar um include. Para isso crie um arquivo header.ejs na raiz do diretório /views/ conforme código demonstrado na **Listagem 10**.

**Listagem 10**. Modificando as rotas da aplicação.

```
<!DOCTYPE html>
<html>
   <head>
      <meta charset='utf-8' />
      <title>Nwitter - Twitter com NodeJS</title>
   </head>
   <body>
```

Caso deseje incorporar uma folha de estilo CSS, um JavaScript ou uma imagem, a inclusão é feita normalmente e a URL deve ser igual ao do diretório public, mas desconsidere do path o diretório public, por exemplo:

```
<link rel="stylesheet" type="text/css" href="/stylesheets/meu_style.css" media="all" />
```

E em seguida deve-se criar um arquivo chamado footer.ejs com o mesmo conteúdo apresentado na **Listagem 11** e no mesmo local onde foi salvo o arquivo header.ejs.

**Listagem 11**. Arquivo de rodapé da aplicação.

```
<footer>
         <p>Nwitter – Web Magazine ®</p>
      </footer>
   </body>
</html>
```

Porém, o arquivo index.ejs ainda contém o cabeçalho e o rodapé, portanto, deve-se remover o cabeçalho e o rodapé e inserir as notações de importação dos templates, o arquivo deve ficar desta forma:

```
<% include header.ejs %>
  <h1>Seja bem-vindo!</h1>
  <% include footer.ejs %>
```

E neste momento será criado o template da página de autenticação do sistema, um formulário simples, preencha o arquivologin.ejs com o mesmo código da **Listagem 12** que se encontra no diretório /usuario/.

**Listagem 12**. Interface do formulário de login.

```
<% include ../header.ejs %>

<form action='/usuario/login/processa' method='POST'>
      <input type='text' name='login' placeholder='login' />
      <input type='password' name='senha' placeholder='senha' />

      <a href='/usuario/cadastro'>Criar nova conta</a>

      <input type='submit' value='Entrar' />
</form>

<% include ../footer.ejs %>
```

Pode-se perceber que este formulário já conta com um link de cadastro, que por sua vez será implementado posteriormente. Antes de prosseguir, realize o teste, finalize a aplicação (caso ainda esteja em execução no terminal) e inicie novamente através do comando node app.js e acesse a URL /usuario/login. O resultado apresentado deve ser similar ao formulário apresentado na **Figura 6**.

![Tela de login do sistema]()**Figura 6**. Tela de login do sistema.

Mas ao submeter os dados no formulário é apresentado um erro “Cannot POST /usuário/login/processa” pois o processamento destes dados ainda não foi implantado. Ou seja, deve-se criar uma nova rota (neste caso, para a URL /usuario/login/processa) e também será necessário criar uma seção para o usuário quando o mesmo se autenticar (não será feita a implementação com o banco de dados por enquanto, apenas uma verificação se os campos foram preenchidos). Seguindo a **Listagem 13** altere o arquivo app.js.

**Listagem 13**. Adicionando suporte a cookies e inserindo a rota de processamento do login.

```
…
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser());
  app.use(express.session({'secret': ‘seuSegredoAqui’}));
  app.use(app.router);

  app.get('/', routes.index);
  app.get('/usuario/login', routes.usuario.login);
  app.post('/usuario/login/processa', routes.usuario.login.processa);
…
```

Nesta iteração, foi criada uma chamada para dois módulos nativos do Express, o session (que é exatamente para o manuseio de sessões) e o CookieParser, que é obrigatório para que o session funcione e é também obrigatória a declaração do Cookieparser antes da declaração do session. Também é possível perceber que foi cadastrado um atributo secret dentro da chamada do session, o desenvolvedor pode preencher com qualquer string este atributo para que seja gerado um hash específico para a aplicação o que, por sua vez, agrega mais segurança na criptografia de valores da sessão. E por fim foi relacionada a rota /usuario/login/processa com o método processa das rotas usuário, vale ressaltar que esta URL não foi criada como resposta a um método GET mas sim utilizando POST, diferente de todas as outras que já foram registradas.

E neste momento, conforme apresentado na **Listagem 14** referente ao conteúdo do arquivo routes.js, será criada a função para capturar os dados que foram enviados, verificar se realmente os dados foram preenchidos e criar uma sessão de usuário, mas não é correto realizar este processamento no arquivo de rotas de usuario, esta função deve estar alocada por enquanto no router da entidade usuário, mais adiante será agregado ao projeto mais uma ferramenta para facilitar o uso dos controladores.

**Listagem 14**. Função de validação de login e senha.

```
exports.login = function(req, res){
      res.render('usuario/login');
};
exports.login.processa = function(req, res){
      var querystring = require('querystring');
      var data = "";

      req.on("data", function(chunk) {
        data += chunk;
    });

    req.on("end", function() {
        json = querystring.parse(data);

        if((json.login != "") && (json.senha != "")){
            req.session.usuario = json.login;
            res.redirect('/');
          }else{
            res.redirect('/usuario/login');
          }
    });
};
```

O código adicionado representa a criação de um novo método chamado processa (que neste caso foi adicionado dentro de login apenas para uma melhor organização do código de chamada no script app.js) e incluso um módulo de query string, onde os dados recebido serão tratados e uma variável para o armazenamento dos dados recebidos, logo em seguida é inserido um callback na função on data, esta função faz o armazenamento das informações trazidas pelo form, porém, estas informações vêm na forma de query strings, por isso, elas serão tratadas na função disparada após o fim da recepção da requisição. Em seguida, ao fim da requisição (função on end) os dados recebidos são convertidos para o formato JSON e partir dai podem ser processados. Neste caso, foi feita uma verificação extremamente simples comparando se os dados recebidos estão preenchidos ou não. Caso estejam preenchidos o usuário tem sua sessão criada e é redirecionado para home page do sistema, do contrário ele é revertido à página de login sem nenhuma mensagem de erro.

O importante deste exemplo é demonstrar como o processo simples de login pode ser custoso e demorado sem o uso de duas ferramentas que podem auxiliar ainda mais o desenvolvedor e evitar que ele tenha que escrever códigos repetitivos de baixo nível. O primeiro problema que é perceptível é o código de roteamento, os scripts de routes estão responsáveis pelo processamento das requisições enquanto na verdade eles devem simplesmente armazenar as rotas e as funções do controller a chamar, sem mencionar no fato de registrar todas as rotas possíveis no arquivo app.js. Pode-se mover as notações de get e post dentro do arquivo de routes e dentro dos arquivos de rotas incluir o módulo do express, isto resolveria o problema. Porém, será adicionado ao projeto outro módulo do express que fará com que o load de todas os controllers, módulos e routes ocorra automaticamente sem que todos estes elementos sejam exaustivamente declarados no app.js, tornando a aplicação mais legível.

Na **Listagem 15** é demonstrada a adição de outro módulo ao sistema, este por sua vez, nativo do Express, é o body parser, que trará na requisição todos os campos do formulário submetido, tornando a captação dos dados mais intuitiva e menos sujeita a falhas por parte de implementação.

**Listagem 15**. Adicionando o Express Load as dependências da aplicação.

```
…
  "dependencies": {
      "express": "3.4.4",
      "ejs": "0.8.4",
      "express-load":"1.1.7"
    }
…
```

Após salvar este arquivo, execute o código npm install no terminal. E agora será incluso o modulo de Express load e o bodyparser, altere alguns trechos do app.js conforme apresentado na **Listagem 16**.

**Listagem 16**. Integrando o Express Load e o Body Parser a aplicação.

```
…
  var express = require('express');
  var load = require('express-load');
  var http = require('http');
  var path = require('path');

  var app = express();
  …
  app.use(express.cookieParser());
  app.use(express.session({'secret': 'seuSegredoAqui'}));
  app.use(express.bodyParser());
  app.use(app.router);

  load('models').
  then('controllers').
  then('routes').
  into(app);
…
```

Repare que foi movida a linha onde é declarado o app e criada uma notação para a inclusão dos módulos dos diretórios models, controllers e routers, tudo carregado dentro do objeto app. É muito importante também a ordem de carregamento destes elementos para que tudo funcione corretamente. Na **Listagem 17** estão elencadas as linhas a serem removidas do arquivo app.js.

**Listagem 17**. Remoção das rotas do arquivo app.js.

```
…
 var routes = require('./routes');
  routes.usuario = require('./routes/usuario');
  …
  app.get('/', routes.index);
  app.get('/usuario/login', routes.usuario.login);
  app.post('/usuario/login/processa', routes.usuario.login.processa);
…
```

Estas declarações não são mais úteis dentro do contexto do app.js, logo que o load das rotas também será automático. Uma vez que estas facilidades foram agregadas ao projeto, é preciso refatorar a entidade usuario. Primeiramente crie o arquivo controllers/usuario.js, no mesmo será inserido o processamento do login que se encontra no routes/usuario.js, mas também será feito uso do bodyparser. As **Listagens 18, 19 e 20** apresentam o conteúdo dos arquivos de controllers e rotas reformulados para que se faça o uso correto destes recursos.

**Listagem 18**. Conteúdo do arquivo controllers/usuario.js.

```
module.exports = function(app){
      var UsuarioController = {

         login: function(req, res){
                  res.render('usuario/login');
            },

         loginAction: function(req, res){
             if((req.body.login != "") && (req.body.senha != "")){
                 req.session.usuario = req.body.login;
                 res.redirect('/');
             }else{
                  res.redirect('/usuario/login');
                   }
          }
      }

      return UsuarioController;
};
```

**Listagem 19**. Reformulação do arquivo routes/usuario.js.

```
module.exports = function(app){
      var usuario = app.controllers.usuario;

      app.get("/usuario/login", usuario.login);
      app.post("/usuario/login/processa", usuario.loginAction)
}
```

**Listagem 20**. Reformulação do arquivo routes/index.js.

```
module.exports = function(app){
      app.get("/", function(req, res){
            res.render('index');
      });
}
```

A seguir, será implantada a integração do sistema com o banco de dados, no caso deste artigo, será utilizado o banco de dados no-sql MongoDB, por sua fácil integração com o Node.js.

### Integração com MongoDB

O MongoDB é uma base dados orientada a documentos e no últimos anos vem sendo muito utilizada pelos desenvolvedores se destacando como o banco de dados No SQL mais utilizado no mercado, a classificação No SQL, de forma que as bases de dados são estruturadas em documentos com uma certa similaridade com a notação JSON (no caso esta formatação é na verdade chamada de BSON). Sua instalação e implantação se dão de forma fácil e intuitiva e a integração com Node.js exige menos esforço que um banco de dados MySQL ou PostgreSQL.

Para instalar o mongoDB basta realizar o download no site oficial (veja seção **Links**), ou através do gerenciador de pacotes, no caso do Linux, e instalá-lo normalmente. Após a instalação, como demonstrado na **Listagem 21**, é necessário incluí-lo no package do projeto.

**Listagem 21**. Inclusão do mongoose nas dependências do projeto.

```
…
…
"dependencies": {
    "express": "3.4.4",
    "ejs": "0.8.4",
    "express-load":"1.1.7",
    "mongoose":"3.8.0"
  }
…
```

E após a alteração execute o instalador do NPM (npm install), e por fim se inicia a integração com a base de dados MongoDB. Na **Listagem 22** o mongoose é instanciado no arquivo principal do projeto (app.js).

**Listagem 22**. Carregando o mongoose no arquivo app.js.

```
…
var express = require('express');
var load = require('express-load');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
…
```

Agora o sistema já suporta a interação dos models com um banco de dados MongoDB. Será criado um arquivo como função de modelo do sistema, onde são declarados os Schemas (que de certa forma se assemelham às tabelas dos bancos de dados relacionais), os campos referentes ao Schema e os relacionamentos com outros modelos. Portanto, crie um arquivo usuario.js dentro do diretório /models/ com o conteúdo apresentado na **Listagem 23**.

**Listagem 23**. Criação do modelo de usuário.

```
module.exports = function(){
    var db = require('mongoose');
    var Schema = db.Schema;

    var usuario = Schema({
        nome: {type: String, required: true},
        nickname: {type: String, required: true, index:{unique:true}},
        email: {type: String, required: true, index:{unique:true}},
        senha: {type: String, required: true}
    });

    return db.model('usuarios', usuario);
}
```

Ou seja, a entidade usuário possui quatro campos: nome, nickname, email e senha, todos os campos são obrigatórios e do tipo String. Não é necessário declarar um campo de ID porque o próprio mongodb se encarrega pela criação deste campo automaticamente.

Na **Listagem 24** é demonstrada a criação de um arquivo no diretório /views/usuário/ com o nome de cadastro.ejs, referente ao formulário de cadastro que caracteriza onde será criada a funcionalidade de login completa.

**Listagem 24**. Template do formulário de cadastro.

```
<% include ../header.ejs %>
<form action='/usuario/cadastro' method='POST'>
      <label for="usuario_nome">Nome:</label><input type='text' name='usuario[nome]' id='usuario_nome' />
      <label for="usuario_nickname">Nickname: @</label><input type='text' name='usuario[nickname]' id='usuario_nickname'/>
      <label for="usuario_email">E-mail:</label><input type='text' name='usuario[email]' id='usuario_email'/>
      <label for="usuario_senha">Senha:</label><input type='password' name='usuario[senha]' id='usuario_senha'/>
      <label for="usuario_conf_senha">Confirmação de senha:</label><input type='password' name='usuario[conf_senha]' id='usuario_conf_senha'  />

      <input type='submit' value='Entrar' />
</form>

<% include ../footer.ejs %>
```

Atente ao fato também de que neste formulário de cadastro também será necessário um sistema de validação dos campos, esta validação será realizada no controller referente à entidade do usuário, antes de implantar os métodos do controlador, na **Listagem 25** é acrescentado suporte ao validador de formulários a ser utilizado no nosso arquivo de configurações da nossa aplicação.

**Listagem 25**. Adicionando suporte ao Express Validator do package.json.

```
…
"dependencies": {
    "express": "3.4.4",
    "ejs": "0.8.4",
    "express-load":"1.1.7",
    "mongoose":"3.8.0",
    "express-validator":"2.6.0"
  }
…
```

E por sua vez na **Listagem 26**, vamos fazer a alteração do arquivo principal da aplicação invocando o express-validator.

**Listagem 26**. Adicionando suporte ao Express Validator no app.js.

```
var express = require('express');
var load = require('express-load');
var expressValidator = require("express-validator");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
…
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
```

O Express validator é um modulo criado como uma cópia do node-validator, mas adaptado ao express, mas todas as funções de validação são baseadas em seu módulo original, prosseguindo para o controller usuário, tornando a função de cadastro similar ao apresentado na **Listagem 27**.

**Listagem 27**. Processando entradas do usuário antes de realizar o cadastro.

```
…
cadastro: function(req, res){
            res.render("usuario/cadastro");
          },

          cadastroAction: function(req, res){

            req.assert(['usuario', 'nome'], 'Insira seu nome completo').notEmpty();
            req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
            req.assert(['usuario', 'email'], 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
            req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
            req.assert(['usuario', 'conf_senha'], 'Confira sua senha').len(6,20);
            req.assert(['usuario', 'conf_senha'], 'As senhas não são compatíveis').equals(req.body.usuario.senha);

            var errors = req.validationErrors();

            if(errors){
                  res.render("usuario/cadastro", {'errors': errors});
            }else{
                  var usuarioModel = app.models.usuario;
                  usuarioModel.create(req.body.usuario, function(error, usuario){
                        if(error){
                              res.render("usuario/cadastro", {'errors': [{'msg': error.err}]});
                        }else{
                              res.redirect("/usuario/login");
                        }
                  });
            }
      }
…
```

Quanto ao método cadastro, não há nada diferença do método login, para a renderização da página desejada, salvo a diferença do parâmetro que indica qual o template a ser renderizado. Mas o método cadastroAction apresenta uma série de novos elementos que até agora não foram contemplados. Logo nota-se o uso de uma notação assert, este conjunto de funções indica as regras dos dados submetidos pelo formulário, alimentado por dois parâmetros.

O primeiro parâmetro indica o campo a ser validado e neste caso em especifico se trata de um vetor JSON, pois os campos usam o seguinte padrão de nomenclatura: entidade[nome do campo] para uma melhor organização dos dados recebidos pelo formulário e uma inclusão mais fácil no modelo da entidade.

O segundo parâmetro se trata da mensagem de erro a ser exibida caso o campo esteja inválido, e em seguida ao método assert, são passados mais alguns métodos com as regras de validação (caso queira ver a lista completa, veja na seção de **Links**).

Em seguida é criada uma variável contendo todos os possíveis erros encontrados no formulário pelo módulo de validação, se houver erros a página de cadastro é renderizada novamente, mas com os erros de validação. Caso contrário, se todos os dados estiverem válidos é realizada a inclusão do cadastro do usuário. O modelo da entidade é invocado, e então este mesmo objeto realiza a criação do usuário utilizando apenas como entrada os campos do formulário de cadastro, dispensando qualquer tipo de tratamento. No call-back da função de inserção é verificado se foi encontrado algum erro de inserção, caso haja algum erro durante a inserção dos dados no MongoDB, o formulário será renderizado desta vez com os erros específicos retornados pelo próprio banco de dados. Do contrário, ele será redirecionado para a página de login.

Na **Listagem 28** é apresentado o código a ser implementado para que seja criado o template que fará a apresentação de todos os erros de validação do formulário, este padrão pode ser atrelado a qualquer formulário do site que possua uma rotina de validação do Express Validator. Crie um arquivo dentro do diretório views com o nome de errorlist.ejs.

**Listagem 28**. Template do elemento que apresentará todos os erros do formulário.

```
<% if(typeof(errors) != "undefined"){ %>
      <ul>
      <% for(var error in errors){ %>
      <li><%= errors[error].msg %></li>
  <%
        }
  %>
      </ul>
<% } %>
```

Conforme apresentado na **Listagem 29**, o arquivo /views/usuário/cadsatro.ejs, é alterado para que o template de erros recentemente criado seja invocado.

**Listagem 29**. Inclusão do modulo de erros.

```
<% include ../header.ejs %>

  <% include ../errorlist.ejs %>

  <form action='/usuario/cadastro' method='POST'>
…
```

Este arquivo será mantido na raiz do diretório views pois ele será utilizado em outras páginas do sistema, tal como no login, onde deverá ser incluída também a validação dos campos de nickname e senha, conforme apresentado na **Listagem 30**. Para isto no arquivo login.ejs dentro do diretório views/usuario, insira também o include para o errorlist logo após a inclusão do header. Também será necessário alterar o nome dos campos para se respeitar o mesmo padrão que na página de cadastro.

**Listagem 30**. Inclusão do modulo de erros na página de login e alteração do nome dos campos.

```
<% include ../header.ejs %>

  <% include ../errorlist.ejs %>

  <form action='/usuario/login' method='POST'>
        <input type='text' name='usuario[nickname]' placeholder='Nickname' />
        <input type='password' name='usuario[senha]' placeholder='Senha' />
```

E conforme a **Listagem 31**, também será implantado o sistema completo de login, incluindo as regras de validação.

**Listagem 31**. Action de login utilizando a integração com banco de dados.

```
…
loginAction: function(req, res){
            req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
            req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);

            var errors = req.validationErrors();

              if(!errors){
                  var usuarioModel = app.models.usuario;
                  var query = {nickname: req.body.usuario.nickname, senha: req.body.usuario.senha};

                  usuarioModel.findOne(query).select('nome email nickname').exec(function(error, usuario){
                        if(usuario){
                              req.session.usuario = usuario;
                              res.redirect('/');
                        }else{
                              res.render('usuario/login', {'errors': [{'msg': 'Nickname ou Senha inválida'}]})
                        }
                  });
                }else{
                  res.render('usuario/login', {'errors': errors});
                }
          },
…
```

A alteração no método consiste na inclusão de regras de validação, semelhante ao cadastro e em seguida, é feita uma busca pelos dados inseridos na base de dados, caso sejam encontrados os dados de acesso o usuário é redirecionado para a página principal do site, do contrário, a página de login será renderizada com a mensagem de erro alertando sobre os dados incorretos. E antes de prosseguir o desenvolvimento deve-se criar também o método para realizar o logout do sistema como demonstrado na **Listagem 32**

**Listagem 32**. Método de logout.

```
…
logout: function(req, res){
      if(typeof(req.session.usuario) != "undefined"){
            req.session.destroy();
            res.redirect("/");
      }
}
…
```

Para que o logout funcione com a URL /usuario/logout é necessário criar esta nova rota e direcioná-la ao método recém criado.

```
app.get("/usuario/logout", usuario.logout);
```

E para evitar que o usuário acesse a página de acesso depois de já ter realizado o login, altere o próprio arquivo de rotas do usuário e altere estas duas rotas:

```
app.get("/usuario/login", isLoggedIn, usuario.login);
app.post("/usuario/login/processa", isLoggedIn, usuario.loginAction);
```

Na **Listagem 33** é descrita a função que deve ser criada ao fim do mesmo arquivo de rotas do usuário que impedirá o acesso dele à página de login após ele já ter validado seu acesso.

**Listagem 33**. Função de redirecionamento caso o usuário já esteja validado.

```
var isLoggedIn = function(req, res, next){
      if(typeof(req.session.usuario) != "undefined"){
            if(req.session.usuario != ""){
                  res.redirect("/");
            }
      }
      next();
}
```

Ou seja, sempre que forem acessadas as URLs de login, tanto via GET ou POST, obrigatoriamente antes será realizado o processamento da função LoggedIn e depois do método do controller usuário.

Na **Listagem 34** está referenciado o conteúdo completo da página principal (/views/index.ejs) com a listagem de postagens e o painel para o usuário realizar as postagens, mas este formulário só estará disponível caso ele esteja logado no sistema

**Listagem 34**. Página principal do sistema com o formulário para postagens e lista de últimos posts.

```
<% include header.ejs %>

<% if(typeof(session.usuario) == "undefined"){ %>
<ul class='menu'>
      <li><a href='/usuario/login'>Login</a></li>
      <li><a href='/usuario/cadastro'>Cadastro</a></li>
</ul>
<% }else{ %>
<ul class='menu'>
      <li><a href='/usuario/logout'>Logout (@<%= session.usuario.nickname %>)</a></li>
</ul>
<form action="/nweet/submit" method="POST">
      <label>Insira aqui seu Nweet (140 caracteres)!</label>
      <textarea name='nweet[texto]' id='nweet_texto'></textarea>
      <input type='submit' value='Nweet!' />
</form>
<% } %>

<% if(typeof(nweets) != "undefined"){ %>
      //Lista de Nweets
<% } %>

<% include footer.ejs %>
```

Você tem a opção de isolar o menu em um arquivo a parte e realizar uma inclusão dele também. Agora, vamos criar o arquivo de rotas para as postagens, crie o arquivo /routes/nweets.js com este conteúdo.

As postagens também precisam de um arquivo de rotas para que a action do formulário de postagens funcione corretamente, e como apresentado na **Listagem 35**,

**Listagem 35**. Rota da ação de postagem.

```
module.exports = function(app){
      var nweet = app.controllers.nweet;
      app.post("/nweet/submit", nweet.submit);
}
```

Ótimo, agora temos as rotas, mas antes de prosseguirmos para o controller, vamos primeiro criar o modelo do nweet para o MongoDB, então crie um arquivo chamado nweet.js dentro do diretório models, com o conteúdo apresentado na **Listagem 36**.

**Listagem 36**. Modelo de dados do nweet.

```
module.exports = function(){
var db = require('mongoose');
var Schema = db.Schema;

var nweet = Schema({
autor: {type: Schema.ObjectId, required: true, ref: "usuarios"},
texto: {type: String, required: true},
data: {type: Date, default: Date.now}
});

return db.model('nweets', nweet);
}
```

E na **Listagem 37** está descrita a função para o processamento das postagens do usuário.

**Listagem 37**. Método responsável pela criação das postagens.

```
module.exports = function(app){
      var NweetController = {

            submit: function(req,res){

                  req.assert(['nweet', 'texto'], 'Insira o conteúdo do seu nweet').len(1,140);

                  var errors = req.validationErrors();

                  if(errors){
                  res.render("/", {'errors': errors});
            }else{
                  var nweetModel = app.models.nweet;

                  req.body.nweet.autor = req.session.usuario._id;

                  nweetModel.create(req.body.nweet, function(error, nweet){
                        res.redirect("/");
                  });
             }
            }
      }

      return NweetController;
};
```

Este controller será responsável por primeiro validar o post, se ele possui entre 1 e 140 caracteres, caso não for detectado nenhum erro, o post é criado na base de dados, mas antes é inserido o valor do campo autor com o id do usuário, previamente armazenado nas variáveis de sessão, e logo após ocorre o redirecionamento para a página principal, exibindo os últimos posts novamente. Na **Listagem 38** é apresentado o arquivo de rotas /routes/index.js onde é criada uma rota para que a página principal receba todos os posts e os dados da sessão do usuário.

**Listagem 38**. Rota para trazer todas últimas 30 postagens.

```
module.exports = function(app){
      app.get("/", function(req, res){
            var nweetModel = app.models.nweet;

            nweetModel.find().populate('autor').sort( [['data', 'descending']] ).limit(30).exec(function( error, nweets ){
                  res.render('index', {'session': req.session, "nweets": nweets});
            });
      });
}
```

De forma que o modelo de posts faz a seleção de todos os posts por ordem de data de forma decrescente com limite 30, e após isto é renderizada a página principal atrelada também com as variáveis de sessão. E para finalizar a implantação, na **Listagem 39** é demonstrado o loop para a exibição de cada um dos posts, portanto, onde está o comentário “Lista de Nweets”.

**Listagem 39**. Template da listagem de todas postagens.

```
<ul>
      <% for(var index in nweets){ %>
            <%
                  if(nweets[index].autor != null ){
                  var dataFormatada = new Date(nweets[index].data);
            %>
            <li>
                  <p>@<%= nweets[index].autor.nickname %>: <%= nweets[index].texto %></p>
                  <p class='publish_date'><%=
                        dataFormatada.getHours() + ":" +
                        dataFormatada.getMinutes() + " " +
                        dataFormatada.getDate() + "/"  +
                        (dataFormatada.getMonth() + 1 )
                  %></p>
            </li>
            <% } %>
<%
      }
%>
</ul>
```

Por fim, inicie a aplicação, crie um cadastro para seu usuário e crie algumas postagens. Também é possível fazer algumas melhorias, como: Adicionar suporte a upload de imagens, sistema de chat e dentre vários outros recursos para tornar o sistema mais atraente.

A aplicação demonstrada usa apenas um pequeno potencial do Node.js, esta plataforma pode se estender nos mais diversos protocolos de comunicação, sendo uma verdadeira carta na manga no caso de alguma dificuldade em um projeto de sistemas que exija algum módulo que precise de mais agilidade no atendimento de requisições ou um volume alto de acessos dos usuários.

Alguns desenvolvedores tem inclusive portado o *Node.js para sistemas Raspberry Pi*, criando um servidor de internet de extremo baixo custo e de implementação simples.