# NODE.JS

## Programação assíncrona em Node.js - Callbacks e Promises

##### Luiz Duarte

Computadores são assíncronos por padrão. Isto significa que coisas podem acontecer de maneira independente do fluxo do programa principal. Nos computadores atuais, cada programa roda por um tempo específico e então pára sua execução para permitir que outro programa execute um pouco. Isto acontece tão rápido que é quase impossível perceber e temos geralmente a falsa impressão de que o computador está de fato fazendo várias coisas ao MESMO tempo, quando na verdade ele está fazendo UMA coisa de cada vez, um pouco de cada.

Claro, isso tendo uma CPU em mente. A realidade para UMA CPU é essa.

Programas internamente usam interrupções, um sinal que é emitido para o processador quando o programa quer a atenção do sistema. Logo, é normal para os programas serem assíncronos: eles começam, são deixados processando sozinhos e quando algo novo requer a atenção do sistema, eles emitem esse aviso.

No entanto, normalmente as linguagens de programação são síncronas (executam o código em série, uma linha depois da outra) e algumas fornecem mecanismos de assincronicidade através de bibliotecas. C, Java, C#, PHP, Go, Ruby, Swift, Python e JavaScript. Todas elas são síncronas por padrão e várias delas permitem assincronicidade usando threads, criando novos fluxos do processo.

Em Node.js, por outro lado, as coisas são diferentes, graças ao Event Loop. Resumidamente, dependendo do tipo de processamento necessário, a atividade sai da thread principal e é enviada para um pool de threads em background automaticamente e só retorna ao event loop quando terminar.

Como o Node se organiza para isso? Inicialmente através dos callbacks!

Se preferir ver um vídeo ao invés de ler um artigo, segue um trecho de uma aula minha.

## Callbacks em Node.js

Um callback é um listener, uma função que será disparada QUANDO e SE um evento acontecer. Isso já era usado desde os primórdios do JavaScript, quando ele foi inventado para rodar no front-end dos sites. Criávamos um código para ser disparado no clique de um botão, ou seja, no FUTURO. Não era na sequência linear do programa, era pra ser assíncrono (fora da sincronia normal), entende?

Como no JavaScript mesmo as funções são objetos, podemos armazená-las para serem disparadas mais tarde e esse princípio é a base dos callbacks. Um callback, resumidamente é uma função para ser “chamada de volta” (“to be called back” em Inglês) quando outra função terminar e você encontra isso desde o JS “raiz” (vanilla) como no exemplo abaixo.

```
setTimeout(() => { 
   //executa depois de 2 segundos 
}, 2000)
```

```
setTimeout(() => { 
   //executa depois de 2 segundos 
}, 2000)
Um dos desafios desse modelo é como fazer a gestão de erros. E uma solução encontrada é o que é feito no Node.js: o primeiro parâmetro de qualquer callback é o objeto de erro e isso é um padrão em Node.js, é o jeito default de se trabalhar com a tecnologia.
```

Essa simplicidade e praticidade é excelente para cenários simples. No entanto, outro problema com os callbacks, esse jamais sanado é o aninhamento de callbacks, o famoso callback hell (inferno de callbacks)!

Afinal, como lidar quando um callback também possui um callback? E se esse callback do callback possuir outro callback? O exemplo abaixo em JavaScript puro ilustra um pouco isso, em apenas 4 níveis:

```
window.addEventListener('load', () => { 
   document.getElementById('button').addEventListener('click', () => { 
      setTimeout(() => { 
         items.forEach(item => { 
            //seu código aqui 
         }) 
      }, 2000) 
   }) 
})
```

```
window.addEventListener('load', () => { 
   document.getElementById('button').addEventListener('click', () => { 
      setTimeout(() => { 
         items.forEach(item => { 
            //seu código aqui 
         }) 
      }, 2000) 
   }) 
})
```

Em uma tecnologia assíncrona como Node.js, isso não é algo incomum e o uso de callbacks em cenários complexos acaba se tornando um pesadelo rapidamente.

A partir da versão 6 do ECMAScript (ES6, de 2015), foi introduzido Promises, uma nova e mais elegante maneira de lidar com o encadeamento de funções assíncronas (async function chaining) e vai ser alvo de estudo neste artigo.

## Promises em Node.js

Uma promise (promessa, em Inglês) é comumente definida como um proxy para um valor que eventualmente estará disponível. Embora este recurso seja mais antigo que 2015, foi neste ano que ele se tornou padrão na implementação ECMAScript e mesmo que em 2017 tenha sido implementado async/await na linguagem, Promises ainda é a base e deve ser entendida.

Basicamente, uma vez que uma promise é chamada, ela inicia em pending state (pendente). Isto significa que a função caller (que chamou a promise) continua sua execução enquanto espera pela promise terminar seu próprio processamento e retornar ao caller com algum feedback.

Quando esse retorno acontece, a promise é retornada em resolved state ou rejected state.

### Criando uma Promise em Node.js

Para criar uma promise é bem simples, usa-se o construtor da própria classe e passa-se uma function como único argumento, que possui funções de resolve e reject na sua assinatura. Dentro dessa function, você deve chamar resolve quando sua execução for bem sucedida, ou reject, caso contrário.

Abaixo um pequeno exemplo:

```
//index.js
function soAceitaPares(numero){
    const promise = new Promise( (resolve, reject) => { 
                        if (numero % 2 === 0) { 
                            const resultado = 'Viva, é par!';
                            resolve(resultado);
                        } 
                        else { 
                            reject(new Error("Você passou um número ímpar!"));
                        } 
                    });
    return promise;
}
```

```
//index.js
function soAceitaPares(numero){
    const promise = new Promise( (resolve, reject) => { 
                        if (numero % 2 === 0) { 
                            const resultado = 'Viva, é par!';
                            resolve(resultado);
                        } 
                        else { 
                            reject(new Error("Você passou um número ímpar!"));
                        } 
                    });
    return promise;
}
```

Como pode ver, criei uma função que só aceita pares (ignore o fato dela ser beeeem simples, foque nos conceitos). Essa função retorna uma promise para permitir que seu conteúdo rode de maneira assíncrona. A promise que será retornada avalia o argumento ‘numero’ e se ele for par, retorna uma promise resolved, mas caso contrário, retorna uma promise rejected. Ambas funções de retorno (resolve e reject) permitem a passagem de um objeto por parâmetro que vai ser lido por quem estiver aguardando um feedback dessa promise.

Consumindo uma promise em Node.js

Usar uma promise é ainda mais fácil que criar uma e vou usar como base o código anterior. Quando você for chamar a function soAceitaPares, você vai chamá-la normalmente e depois captura o seu retorno positivo (resolved) com a função then e o retorno negativo (rejected) com a função catch, como abaixo.

```
soAceitaPares(2)
    .then(result => console.log("Promise resolved: " + result))
    .catch(error => console.log("Promises rejected: " + error));

console.log("teste");
```
```
soAceitaPares(2)
    .then(result => console.log("Promise resolved: " + result))
    .catch(error => console.log("Promises rejected: " + error));
 
console.log("teste");
```
Ao executar esse código, você verá que ele vai imprimir primeiro a linha teste, depois o conteúdo do then e NÃO vai chegar nem perto do conteúdo do catch. Agora se trocar o argumento de soAceitaPares para um número ímpar, verá que ele continua imprimindo o teste, executa o conteúdo do catch e não do then.

Por que ele imprime o teste primeiro? Porque visualmente parece síncrono, mas na verdade a função soAceitaPares é chamada e o código continua executando, imprime o teste e só quando a função terminar é que vai executar o then ou o catch.

Quando usamos bibliotecas de terceiros que implementam promises (a maioria das modernas), é assim que tratamos seu retorno.

Mas e quando o resultado de uma promise é uma função que retorna outra promise? Será que não caímos no mesmo problema do callback hell?

Encadeando promises em Node.js (chaining)

Uma promise pode ser retornada por outra promise, criando uma cadeia ou corrente de promises (chain) e é pra isso que justamente ela foi criada, afinal, para cenários simples os callbacks são excelentes.

Vamos criar outra função de exemplo, que também retorna uma promise:

```
function dividePelaMetade(numero){
    if(numero % 2 !== 0)
        return Promise.reject(new Error("Não posso dividir um número ímpar!"));
    else
        return Promise.resolve(numero / 2);
}
```

```
function dividePelaMetade(numero){
    if(numero % 2 !== 0)
        return Promise.reject(new Error("Não posso dividir um número ímpar!"));
    else
        return Promise.resolve(numero / 2);
}
```
Nesta função, usei outra abordagem de criar promises. Se o número for ímpar, a promise é criada já com o tipo rejeitada retornando um erro. Agora se for par, ela é criada já com o tipo resolvida e retorna a metade do número original. Na prática, ela funciona de maneira exatamente igual à instanciação de promise que fiz anteriormente, escolha a que for mais conveniente ao seu código (eu intercalo conforme vai ficar melhor no código).

Sabemos que cada uma destas duas funções são assíncronas e que se queremos ir para a segunda (dividePelaMetade) só depois de verificar o retorno da primeira (soAceitaPares), não podemos simplesmente usar um if como abaixo, que não funciona.

```
if(soAceitaPares(numero))
   dividePelaMetade(numero);
```

```
if(soAceitaPares(numero))
   dividePelaMetade(numero);
```
Para garantir que dividePelaMetade só seja executada depois que soAceitaPares retornar dizendo se o número é par ou não, temos de encadear o consumo das promises, como abaixo:
```
const numero = 2;
soAceitaPares(2)
    .then(result => dividePelaMetade(numero))
    .then(result2 => console.log("A metade de " + numero + " é " + result2))
    .catch(error => console.log("Promises rejected: " + error));

console.log("teste");
```

```
const numero = 2;
soAceitaPares(2)
    .then(result => dividePelaMetade(numero))
    .then(result2 => console.log("A metade de " + numero + " é " + result2))
    .catch(error => console.log("Promises rejected: " + error));
 
console.log("teste");
```
Assim, a função soAceitaPares é chamada e depois o código continua executando (imprime teste). Quando soAceitaPares terminar, se for sucesso, executará o primeiro then (dividePelaMetade), caso contrário, vai pro catch. Note que ignorei o retorno (result) da função, por que ele é inútil neste caso (mas em casos reais geralmente ele é útil).

Quando dividePelaMetade terminar, se for sucesso, executará o segundo then, cuja variável result2 é o retorno da promise (resolve), ou seja, o número dividido. Caso contrário, ele vai pro catch com o erro.

Em uma situação que a segunda função também retornasse uma promise, teríamos um terceiro then e assim por diante. Já o catch é apenas um, sempre no final, a menos que seu catch dispare um erro, que pode ser capturado por um segundo catch, mas não recomendo.

Mas e quando você tem várias promises que não são exatamente executadas uma depois da outra, mas que todas precisam ter sido finalizada para se tomar uma decisão?

## Sincronizando promises em Node.js

Imagine a situação da imagem abaixo.

Esse é um problema clássico da computação: um processo é “forkado” em vários subprocessos (threads, mas imagine aqui Promises), cada um executando de maneira independente. Porém, em dado momento posterior, o resultado de todos deve ser computado de uma única maneira.

## Como sincronizamos (join) promises em Node.js?

Através da função Promise.all()

Como cada Promise também é um objeto em JavaScript, podemos armazenar todas as promises em um array e depois usando Promise.all() processamos todas elas e o array de resultados é passado em um único then, ou no catch, caso alguma dê erro.

```
const numeros = [2,4,6,8,10];
const promises = [];
numeros.forEach(entry => promises.push(dividePelaMetade(entry)));
Promise.all(promises)
    .then(results => results.forEach(entry => console.log(entry)))
    .catch(error => console.log(error));

console.log("teste");
```

```
const numeros = [2,4,6,8,10];
const promises = [];
numeros.forEach(entry => promises.push(dividePelaMetade(entry)));
Promise.all(promises)
    .then(results => results.forEach(entry => console.log(entry)))
    .catch(error => console.log(error));
 
console.log("teste");
```

No exemplo acima, declarei um array de números e um array de promises. O primeiro é usado em um foreach porque quero dividir todos eles pela metade. Essa função de divisão é assíncrona e retorna uma promise, que eu facilmente adiciono no array de promises.

Como não sabemos quando todas as divisões vão terminar, eu uso o Promise.all na linha seguinte sobre o array de promises e com isso, o then somente será executado quando TODAS promises retornarem. Se todas forem bem resolvidas, um array de results será passado ao then. Caso contrário, se apenas UMA já der erro, o catch será disparado.

Mantive a impressão de teste no final para você ver que as promises são todas assíncronas, ou seja, o teste (síncrono) vai ser impresso antes de todas as promises terminarem!

Experimente colocar um número ímpar no array e verá que somente o catch do Promise.all será executado.

Esse é um recurso muito útil, principalmente nestes cenários de uso de foreach com promises, mas também em diversos outros de junção (join) de threads.

E por hoje é isso, espero que este artigo tenha te ajudado a entender como as promises funcionam!

O código completo deste artigo pode ser visto abaixo:

JavaScript
```
//index.js
function dividePelaMetade(numero){
    if(numero % 2 !== 0)
        return Promise.reject(new Error("Não posso dividir um número ímpar!"));
    else
        return Promise.resolve(numero / 2);
}

function soAceitaPares(numero){
    const promise = new Promise( (resolve, reject) => { 
                        if (numero % 2 === 0) { 
                            const resultado = 'Viva, é par!';
                            resolve(resultado);
                        } 
                        else { 
                            reject(new Error("Você passou um número ímpar!"));
                        } 
                    });
    return promise;
}

const numero = 2;
soAceitaPares(numero)
    .then(result => dividePelaMetade(numero))
    .then(result2 => console.log("A metade de " + numero + " é " + result2))
    .catch(error => console.log("Promises rejected: " + error));

const numeros = [2,4,6,8,10];
const promises = [];
numeros.forEach(entry => promises.push(dividePelaMetade(entry)));
Promise.all(promises)
    .then(results => results.forEach(entry => console.log(entry)))
    .catch(error => console.log(error));

console.log("teste");
```

```
//index.js
function dividePelaMetade(numero){
    if(numero % 2 !== 0)
        return Promise.reject(new Error("Não posso dividir um número ímpar!"));
    else
        return Promise.resolve(numero / 2);
}
 
function soAceitaPares(numero){
    const promise = new Promise( (resolve, reject) => { 
                        if (numero % 2 === 0) { 
                            const resultado = 'Viva, é par!';
                            resolve(resultado);
                        } 
                        else { 
                            reject(new Error("Você passou um número ímpar!"));
                        } 
                    });
    return promise;
}
 
const numero = 2;
soAceitaPares(numero)
    .then(result => dividePelaMetade(numero))
    .then(result2 => console.log("A metade de " + numero + " é " + result2))
    .catch(error => console.log("Promises rejected: " + error));
 
const numeros = [2,4,6,8,10];
const promises = [];
numeros.forEach(entry => promises.push(dividePelaMetade(entry)));
Promise.all(promises)
    .then(results => results.forEach(entry => console.log(entry)))
    .catch(error => console.log(error));
 
console.log("teste");
```

[Artigo Original](https://www.luiztools.com.br/post/programacao-assincrona-em-nodejs-callbacks-e-promises/)