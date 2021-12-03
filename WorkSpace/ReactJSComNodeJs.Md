# NODE.JS

## Tutorial de ReactJS com Node.js
##### Luiz Duarte

O React, resumidamente, é uma biblioteca para construção de interfaces, muito utilizado em Single Page Applications (SPA), uma arquitetura de front-end que permite que, quando você altere de uma página para outra na sua aplicação web, não seja necessário um carregamento completo da mesma, mas sim apenas o conteúdo que é diferente. Isso além de proporcionar uma experiência mais suave ao usuário, dá uma performance muito superior.

E o melhor: tudo isso inteiramente usando JavaScript!

Sim, o HTML, CSS, comportamentos…toda a interface é codificada usando somente JavaScript.

Eu tive a oportunidade de trabalhar no Banco Topázio, onde tanto o Internet Banking quanto o Mobile Banking eram feitos usando ReactJS e React Native, respectivamente, e achei muito legal essa experiência.

## Vantagens

A primeira vantagem é a organização do código. O React segue muito forte o conceito de componentização, ou seja, a gente separa o código da aplicação em pequenos componentes, semelhante ao que fazemos no backend com micro serviços. Por exemplo se eu tenho um botão que é utilizado muito na aplicação, eu posso criar um componente com este botão e utilizá-lo em todos os lugares que ele aparece. Futuramente, se eu precisar corrigir um bug neste botão, eu corrijo no componente e todos os lugares terão essa correção.

Outra vantagem é divisão de responsabilidades. Quando usamos React, o front-end fica somente com a responsabilidade de renderizar a interface corretamente, enquanto todas as regras de negócio ficam no back-end, que será consumido pelo React.

E por fim, a última vantagem que eu gostaria de citar é a possibilidade aceitar múltiplos clientes. Isso porquê o React é uma biblioteca-base, usada pelo ReactJS para projetos web e com o React Native para projetos mobile. Uma vez que você faça um back-end para suportar uma aplicação ReactJS ou React Native, facilmente você pode construir o segundo front-end React e usar o mesmo backend. Além disso, é bem comum o compartilhamento de componentes e bibliotecas JS entre projetos web e mobile quando usando a omnistack do React.

## Criando o projeto

Agora que entendemos um pouco de como funciona o React, que tal criarmos nosso primeiro projeto?

Você pode acompanhar o mesmo conteúdo deste tutorial neste vídeo, se preferir.

Para isso, usaremos um pacote NPM criado pelo próprio time do React que já vai estruturar um projeto para gente, semelhante ao que eu sempre uso nos tutoriais de ExpressJS com o express-generator. O nome desse equivalente para React é o create-react-app.

Para começar, abra o seu terminal e execute o comando abaixo. Para quem não conhece o NPX, ele é semelhante ao NPM, mas ele tenta primeiro executar o pacote, se não conseguir, baixa a dependência faltante e tenta novamente.

```
npx create-react-app react01
```
```
npx create-react-app react01
```

react01, no exemplo acima, é o nome do projeto React que estou criando. Mude o nome conforme o seu interesse e não esqueça de colocar este projeto em uma pasta que se lembre depois. Opcionalmente é possível passar outras instruções neste comando de criação de projeto, mas por enquanto, só isso é o suficiente.

Aguarde a instalação, sim, ela demora…

Depois de terminar a instalação, entre na pasta do projeto pelo terminal e mande rodar com um npm start mesmo. O seu navegador vai se abrir na porta 3000 mostrando o projeto-base do React funcionando, como na imagem abaixo.

Entendendo o projeto
Agora abra a pasta do seu projeto no Visual Studio Code ou similar, para que a gente dê uma olhada em tudo que foi criado automaticamente pra gente.

Alguns itens da estrutura você vai reconhecer de cara, como Node_modules, package.json, etc. Alguns, no entanto, são novos e essenciais entendermos o seu funcionamento. Se dermos uma olhada na página que subiu ali e que coloquei o screenshot, ela sugere que a gente vá em uma pasta src (source – fontes) e altere o arquivo App.js.

Se abrirmos o referido arquivo, devemos encontrar algo parecido com isso:

```
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```
```
import React from 'react';
import logo from './logo.svg';
import './App.css';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
 
export default App;
```
Esse arquivo representa justamente aquela página que está aparecendo no navegador e ela se chama App. Dentro dele, nós temos uma função homônima que nada mais faz do que retorna o HTML a ser renderizado pelo navegador, com alguns tratamentos especiais que veremos mais tarde.

Atenção: você notou que importei uma imagem (logo) e um arquivo CSS usando JavaScript ao invés de referenciá-los pelo caminho no HTML? Isso é necessário e ao mesmo tempo muito prático. Assim, no caso da imagem, você importa a mesma para uma variável e depois usa a variável entre chaves no src da tag IMG.

Por ora, vamos fazer uma pequena alteração, mudando o miolo da página para apresentar o clássico Hello World, como abaixo.

```
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1>Hello World!</h1>
      </header>
    </div>
  );
}

export default App;
```

```
import React from 'react';
import logo from './logo.svg';
import './App.css';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1>Hello World!</h1>
      </header>
    </div>
  );
}
 
export default App;
```

Basta salvar o arquivo e automaticamente você verá que a página no navegador já vai mudar de aparência, como abaixo.

Outros arquivos que você pode querer fazer alterações é no App.css, que define os estilos dessa página App.js. Por exemplo, experimente colocar o seguinte estilo dentro do App.css para ver o resultado:

```
h1 {
   color: Red;
}
```

O que aconteceu? Nem vou colocar o print aqui que é pra te obrigar e testar, hehehe.

Outro arquivo que é importante conhecer é o index.html que fica dentro da pasta public. Abaixo eu reproduzo o mesmo sem os comentários.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Aqui, não vou entrar em detalhes de HTML em si, mas apenas salientar a importância da DIV root. A interface web da nossa aplicação React é gerada via JavaScript (na função App do Ap.js) e embutida dentro dessa div root, em tempo de execução.

Esse é um conceito importante: o JS do React roda depois que a página é carregada e, mais tarde, isso permite que você justamente tenha o comportamento de uma Single Page Application, que é o de poder carregar partes da interface conforme ações do usuário, sem ter de recarregar a página inteira. O arquivo responsável por fazer esse carregamento inicial e posterior controle é o index.js, que eu reproduzo abaixo.
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 
serviceWorker.unregister();
```

Enquanto que o primeiro import é da base do React, a segunda é justamente o que permite usarmos a lib React em aplicações web e o que diferencia do React Native, que é a versão mobile do React. Logo abaixo, além de carregarmos um arquivo de estilo (CSS), temos o carregamento dos módulos de aplicação, por enquanto apenas o App.js (não é necessária a extensão JS), aquele que editamos anteriormente, lembra?

Note como ele chama a função ReactDOM.render passando o módulo App (importado no topo do código) e também passando a div de id root como sendo o contâiner desse App, dentro do quê ele vai ser inserido.

[ARTIGO ORIGINAL](https://www.luiztools.com.br/post/tutorial-de-react-js-com-node-js/)
