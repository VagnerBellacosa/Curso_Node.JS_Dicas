# Node.Js

## Códigos HTML mais organizados e limpos com Pug
##### BRUNA DE FREITAS ESCUDELARIO

Qual desenvolvedor nunca se atrapalhou com as tags do HTML? Aquelas dúvidas sempre surgem: “Será que eu fechei aquela div?” “Por que será que meu html quebrou?”

Para facilitar a vida do desenvolvedor front-end é que surgiu o Pug. Ele é um template engine com alto desempenho e rico em recursos, implementado com JavaScript para o ecossistema Node.js. Funciona como um intermediário entre o Node e o HTML, ou seja, em tempo de execução, o Pug substitui as variáveis do projeto por valores atuais e, em seguida, envia a sequência HTML resultante para o cliente.

Assim como o SASS, o Pug é um pré processador que tem a função de ajudar a realizar tarefas repetitivas, fornecendo recursos não disponíveis no HTML, como por exemplo, iterar elementos de uma lista para criar uma tabela. E o melhor é que ele é totalmente gratuito, aberto e bem mais fácil de usar!

### Como começar?
Basta três passos para começar a usar pug em seus projetos:

1 – Baixar o pacote do pug via npm com o comando:

```
npm install pug
```

2 – Na sua aplicação Node, importá-lo e configurá-lo como seu mecanismo de visualização:

```
app.set('view engine', 'pug') 
```

3 – Criar um arquivo .pug

4 – Usamos os métodos compile() e render() para converter os arquivos em pug para HTML

Pronto, já podemos começar a criar nosso arquivo .pug. Veja abaixo como é simples:

```
doctype html  
html(lang='pt')  
 head
   title Pug
 body
   h1 hello world with pug
   div.container
     p pug is very simple!
```

Depois que transformado em HTML, este código fica assim:

```
<!DOCTYPE html>  
<html lang="pt">  
 <head>
   <title>Pug</title>  
 </head>
 <body>
   <h1>hello world with pug</h1>
   <div class="container">
     <p>pug is very simple!<p>
   </div>
 </body>
</html>
```

Mais prático, não acham? E este foi um exemplo simples. O Pug nos permite fazer muito mais coisas, como o próprio loop que eu já citei.

Note que assim como o Python, o Pug se baseia por indentação e espaços em branco. Isso significa que não há tags de abertura e fechamento, o que torna o código muito mais limpo, organizado e fácil de entender.

Além disso, durante o tempo que o pug está sendo compilado para HTML, o compilador mostra logs de erros se a indentação do arquivo estiver errada. Então ele também atua como uma ferramenta de prevenção de erros no front-end. Bem bacana, né?

[Artigo original](https://imasters.com.br/desenvolvimento/codigos-html-mais-organizados-e-limpos-com-pug)