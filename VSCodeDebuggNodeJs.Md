# Node.Js

##1 – Debug de Node.js no VS Code

Para este exemplo, você precisará ter o Node.js instalado e o VS Code.

Agora, você deve ter um projeto Node.js na sua máquina. Aqui em meu exemplo, eu vou criar um usando o meu velho amigo express-generator.

A lista de comandos para instalar o express-generator, criar uma aplicação express, instalar as dependências e colocar ela para rodar estão abaixo.

```
npm install -g express-generator
express debug-nodejs
cd debug-nodejs
npm install
npm start
```

```
npm install -g express-generator
express debug-nodejs
cd debug-nodejs
npm install
npm start
```

Abra seu navegador e acesse localhost:3000 para ver se está tudo funcionando.

Agora que você tem uma aplicação Node.js rodando, abra ela no VS Code e procure pelo arquivo /routes/index.js, clicando à esquerda da linha 6, para adicionar um breakpoint (ponto de parada, a bolinha vermelha) que será usado para testar se o debug está funcionando.

Agora, vá na toolbar esquerda e selecione a aba Debug (a com o inseto). Você terá algumas opções, clique no link “create a launch.json file”, selecionando qualquer opção na sequência pois vamos reescrever a configuração. Abaixo, a configuração que recomendo.

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach Node.js",
            "processId": "${command:PickProcess}",
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        }
        
    ]
}
```

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach Node.js",
            "processId": "${command:PickProcess}",
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        }
        
    ]
}
```

Com esta configuração, se você estiver com uma aplicação Node.js rodando, basta ir no VS Code e apertar F5 que ele vai te listar os processos do Node que estão em execução e aí você escolhe o que vai depurar.

Agora, quando você interagir com a aplicação e ele chegar no ponto do breakpoint, o fluxo vai ser interrompido e você poderá avançar passo a passo, inspecionar variáveis e etc, no VS Code, fazendo a dita cuja depuração como mostra na imagem abaixo. Dê uma brincada na toolbar de debug que ele abre ali no topo, para entender como tudo funciona.

##2 – Debug de ReactJS no VS Code

Para este exemplo, você precisará ter o Node.js instalado, o VS Code e o Google Chrome.

Agora, você deve ter um projeto ReactJS na sua máquina. Aqui em meu exemplo, eu vou criar um usando o meu velho amigo create-react-app.

A lista de comandos para criar e colocá-lo para rodar está abaixo.

```
npx create-react-app debug-reactjs
cd debug-reactjs
npm start
```

```
npx create-react-app debug-reactjs
cd debug-reactjs
npm start
```

O navegador vai se abrir em localhost:3000 para você ver se está tudo funcionando.

Agora que você tem uma aplicação ReactJS rodando, abra o VS Code e vá na aba de Extensões (aquela com os blocos de construção). Procure e instale a Debugger for Chrome.

Agora abra a sua aplicação ReactJS no VS Code e procure pelo arquivo /src/App.js, clicando à esquerda da linha 5, para adicionar um breakpoint (ponto de parada, a bolinha vermelha) que será usado para testar se o debug está funcionando.

Agora, vá na toolbar esquerda e selecione a aba Debug (a com o inseto). Você terá algumas opções, clique no link “create a launch.json file”, selecionando a opção Chrome na sequência. Você precisará apenas mudar a porta na url da configuração, pois nossa aplicação ReactJS está rodando na porta 3000, lembra?

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Com esta configuração, se você estiver com uma aplicação ReactJS rodando, basta ir no VS Code e apertar F5 que ele vai abrir uma janela do Google Chrome e iniciar a depuração. Como colocamos nosso breakpoint logo na página inicial, ele vai chegar no ponto do breakpoint, o fluxo vai ser interrompido e você poderá avançar passo a passo, inspecionar variáveis e etc, no VS Code, fazendo a dita cuja depuração como mostra na imagem abaixo. Dê uma brincada na toolbar de debug que ele abre ali no topo, para entender como tudo funciona.

##3 – Configuração para Monorepo

E por fim, se você tem um monorepo, cum um projeto React.js e outro Node.js, você deve ter um único launch.json dentro de uma pasta .vscode na raiz do seu projeto, com o conteúdo de ambas configurações, como abaixo.

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach Node.js",
            "processId": "${command:PickProcess}",
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        },
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach Node.js",
            "processId": "${command:PickProcess}",
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        },
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

E então, quando for rodar o debug, você deve escolher se vai rodar a configuração 1 (Attach Node.js) ou a configuração 2 (Launch Chrome), como mostra a imagem abaixo.

[Artigo original](https://www.luiztools.com.br/post/como-fazer-debug-de-aplicacoes-node-js-e-reactjs-no-vs-code/)