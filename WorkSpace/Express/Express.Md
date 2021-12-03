# Node.Js

## Instalação
Assumindo que já tenha instalado o Node.js, crie um diretório para conter o seu aplicativo, e torne-o seu diretório ativo.

```
$ mkdir myapp
$ cd myapp
```

Use o comando npm init para criar um arquivo package.json para o seu aplicativo. Para obter mais informações sobre como o package.json funciona, consulte Detalhes do tratamento de package.json do npm.

```
$ npm init
```

Este comando solicita por várias coisas, como o nome e versão do seu aplicativo. Por enquanto, é possível simplesmente pressionar RETURN para aceitar os padrões para a maioria deles, com as seguintes exceções:

```
entry point: (index.js)
```

Insira app.js, ou qualquer nome que deseje para o arquivo principal. Se desejar que seja index.js, pressione RETURN para aceitar o nome de arquivo padrão sugerido.

Agora instale o Express no diretório myapp e salve-o na lista de dependências. Por exemplo:

```
$ npm install express --save
```

Para instalar o Express temporariamente não o inclua na lista de dependências, omita a opção --save:

```
$ npm install express
```

Módulos do Node instalados com a opção --save são incluídas na lista dependencies no arquivo package.json. Posteriormente, executando npm install no diretório app irá automaticamente instalar os módulos na lista de dependências.

[Artigo original](https://expressjs.com/pt-br/starter/installing.html)