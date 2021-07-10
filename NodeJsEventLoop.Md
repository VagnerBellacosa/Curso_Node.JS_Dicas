# Node.Js

## Entendendo o Node.js Event Loop
##### Luiz Duarte

## O problema

Antes de entrar no Event Loop em si, vamos primeiro entender porque o Node.js possui um e qual o problema que ele propõe resolver.

A maioria dos backends por trás dos websites mais famosos não fazem computações complicadas. Nossos programas passam a maior parte do tempo lendo ou escrevendo no disco, ou melhor, esperando a sua vez de ler e escrever, uma vez que é um recurso lento e concorrido. Quando não estamos nesse processo de ir ao disco, estamos enviando ou recebendo bytes da rede, que é outro processo igualmente demorado. Ambos processos podemos resumir como operações de I/O (Input & Output) ou E/S (Entrada & Saída).

Processar dados, ou seja executar algoritmos, é estupidamente mais rápido do que qualquer operação de IO que você possa querer fazer. Mesmo se tivermos um SSD em nossa máquina com velocidades de leitura de 200-730 MB/s fará com que a leitura de 1KB de dados leve 1.4 micro-segundos. Parece rápido? Saiba que nesse tempo uma CPU de 2GHz consegue executar 28.000 instruções.

Isso mesmo. Ler um arquivo de 1KB demora tanto tempo quanto executar 28.000 instruções no processador. É muito lento.

Quando falamos de IO de rede é ainda pior. Faça um teste, abra o CMD e execute um ping no site do google.com, um dos mais rápidos do planeta:

```
$ ping google.com
64 bytes from 172.217.16.174: icmp_seq=0 ttl=52 time=33.017 ms  
64 bytes from 172.217.16.174: icmp_seq=1 ttl=52 time=83.376 ms  
64 bytes from 172.217.16.174: icmp_seq=2 ttl=52 time=26.552 ms  
```

```
$ ping google.com
64 bytes from 172.217.16.174: icmp_seq=0 ttl=52 time=33.017 ms  
64 bytes from 172.217.16.174: icmp_seq=1 ttl=52 time=83.376 ms  
64 bytes from 172.217.16.174: icmp_seq=2 ttl=52 time=26.552 ms  
```

A latência média nesse teste é de 44 milisegundos. Ou seja, enviar um ping para o Google demora o mesmo tempo que uma CPU necessita para executar 88 milhões de operações.

Ou seja, quando estamos fazendo uma chamada a um recurso na Internet, poderíamos estar fazendo cerca de 88 milhões de coisas diferentes na CPU.

É muita diferença!

## A solução

A maioria dos sistemas operacionais lhe fornece mecanismos de programação assíncrona, o que permite que você mande executar tarefas concorrentes que não ficam esperando uma pela outra, desde que uma não precise do resultado da outra, é claro.

Esse tipo de comportamento pode ser alcançado de diversas maneiras. Atualmente a forma mais comum de fazer isso é através do uso de threads o que geralmente torna nosso código muito mais complexo. Por exemplo, ler um arquivo em Java é uma operação bloqueante, ou seja, seu programa não pode fazer mais exceto esperar a comunicação com a rede ou disco terminar. O que você pode fazer é iniciar uma thread diferente para fazer essa leitura e mandar ela avisar sua thread principal quando a leitura terminar.

Novas formas e programação assíncrona tem surgido com o uso de interfaces async como em Java e C#, mas isso ainda está evoluindo. Por ora isso é entediante, complicado, mas funciona. Mas e o Node? A característica de single-thread dele obviamente deveria representar um problema uma vez que ele só consegue executar uma tarefa de um usuário por vez, certo? Quase.

O Node usa um princípio semelhante ao da função setTimeout(func, x) do Javascript, onde a função passada como primeiro parâmetro é delegada para outra thread executar após x milisegundos, liberando a thread principal para continuar seu fluxo de execução. Mesmo que você defina x como 0, o que pode parecer algo inútil, isso é extremamente útil pois força a função a ser realizada em outra thread imediatamente.

## Node.js Event Loop

Sempre que você chama uma função síncrona (i.e. “normal”) ela vai para uma “call stack” ou pilha de chamadas de funções com o seu endereço em memória, parâmetros e variáveis locais. Se a partir dessa função você chamar outra, esta nova função é empilhada em cima da anterior (não literalmente, mas a ideia é essa). Quando essa nova função termina, ela é removida da call stack e voltamos o fluxo da função anterior. Caso a nova função tenha retornado um valor, o mesmo é adicionado à função anterior na call stack.

Mas o que acontece quando chamamos algo como setTimeout, http.get, process.nextTick, ou fs.readFile? Estes não são recursos nativos do V8, mas estão disponíveis no Chrome WebApi e na C++ API no caso do Node.js.

Vamos dar uma olhada em uma aplicação Node.js comum – um servidor escutando em localhost:3000. Após receber a requisição, o servidor vai chamar wttr.in/ para obter informações do tempo e imprimir algumas mensagens no console e depois retorna a resposta HTTP.

```
'use strict'  
const express = require('express')  
const superagent = require('superagent')  
const app = express()

app.get('/', sendWeatherOfRandomCity)

function sendWeatherOfRandomCity (request, response) {  
  getWeatherOfRandomCity(request, response)
  sayHi()
}

const CITIES = [  
  'london',
  'newyork',
  'paris',
  'budapest',
  'warsaw',
  'rome',
  'madrid',
  'moscow',
  'beijing',
  'capetown',
]

function getWeatherOfRandomCity (request, response) {  
  const city = CITIES[Math.floor(Math.random() * CITIES.length)]
  superagent.get(`wttr.in/${city}`)
    .end((err, res) => {
      if (err) {
        console.log('O snap')
        return response.status(500).send('Erro ao consultar a previsão do tempo.')
      }
      const responseText = res.text
      response.send(responseText)
      console.log('Previsão confirmada!')
    })

  console.log('Obtendo a previsão do tempo, aguarde.')
}

function sayHi () {  
  console.log('Hi')
}

app.listen(3000)
```
```
'use strict'  
const express = require('express')  
const superagent = require('superagent')  
const app = express()
 
app.get('/', sendWeatherOfRandomCity)
 
function sendWeatherOfRandomCity (request, response) {  
  getWeatherOfRandomCity(request, response)
  sayHi()
}
 
const CITIES = [  
  'london',
  'newyork',
  'paris',
  'budapest',
  'warsaw',
  'rome',
  'madrid',
  'moscow',
  'beijing',
  'capetown',
]
 
function getWeatherOfRandomCity (request, response) {  
  const city = CITIES[Math.floor(Math.random() * CITIES.length)]
  superagent.get(`wttr.in/${city}`)
    .end((err, res) => {
      if (err) {
        console.log('O snap')
        return response.status(500).send('Erro ao consultar a previsão do tempo.')
      }
      const responseText = res.text
      response.send(responseText)
      console.log('Previsão confirmada!')
    })
 
  console.log('Obtendo a previsão do tempo, aguarde.')
}
 
function sayHi () {  
  console.log('Hi')
}
 
app.listen(3000)
```
O que será impresso quando uma requisição é enviada para localhost:3000?

Se você já mexeu um pouco com Node antes, não ficará surpreso com o resultado, pois mesmo que console.log(‘Obtendo a previsão do tempo, aguarde.’) tenha sido chamado depois de console.log(‘Previsão confirmada!’) no código, o resultado da requisição será como abaixo:

```
Obtendo a previsão do tempo, aguarde.  
Hi  
Previsão confirmada!
```
O que aconteceu? Mesmo o V8 sendo single-thread, a API C++ do Node não é. Isso significa que toda vez que o Node for solicitado para fazer uma operação bloqueante, Node irá chamar a libuv que executará concorrentemente com o Javascript em background. Uma vez que esta thread concorrente terminar ou jogar um erro, o callback fornecido será chamado com os parâmetros necessários.

A libuv é um biblioteca C++ open-source usada pelo Node em conjunto com o V8 para gerenciar o pool de threads que executa as operações concorrentes ao Event Loop single-thread do Node. Ela cuida da criação e destruição de threads, semáforos e outras “magias” que são necessárias para que as tarefas assíncronas funcionem corretamente. Essa biblioteca foi originalmente escrita para o Node, mas atualmente outros projetos a usam também.

## Task/Event/Message Queue

Javascript é uma linguagem single-thread orientada a eventos. Isto significa que você pode anexar gatilhos ou listeners aos eventos e quando o respectivo evento acontece, o listener executa o callback que foi fornecido.

Toda vez que você chama setTimeout, http.get ou fs.readFile, Node.js envia estas operações para a libuv executá-las em uma thread separada do pool, permitindo que o V8 continue executando o código na thread principal. Quando a tarefa termina e a libuv avisa o Node disso, o Node dispara o callback da referida operação.

No entanto, considerando que só temos uma thread principal e uma call stack principal, onde que os callbacks ficam guardados para serem executados? Na Event/Task/Message Queue, ou o nome que você preferir. O nome ‘event loop’ se dá à esse ciclo de eventos que acontece infinitamente enquanto há callbacks e eventos a serem processados na aplicação.

Em nosso exemplo anterior, de previsão do tempo, nosso event loop ficou assim:

1. Express registrou um handler para o evento ‘request’ que será chamado quando uma requisição chegar em ‘/’
2. ele começar a escutar na porta 3000
3. a stack está vazia, esperando pelo evento ‘request’ disparar
4. quando a requisição chega, o evento dispara e o Express chama o handler configurado: sendWeatherOfRandomCity
5. sendWeatherOfRandomCity é empilhado na call stack
6. getWeatherOfRandomCity é chamado dentro da função anterior e é também empilhado na call stack
7. Math.floor e Math.random são chamadas, empilhadas e logo desempilhadas, retornando uma cidade à variável city
8. superagent.get é chamado com o parâmetro ‘wttr.in/${city}’ e definimos o handler/callback para o evento de término da requisição.
9. a requisição HTTP para http://wttr.in/${city} é enviada para uma thread em background e a execução continua
10. ‘Obtendo a previsão do tempo, aguarde.’é impresso no console e getWeatherOfRandomCity retorna
11. sayHi é chamada, ‘Hi’ é impresso no console
12. sendWeatherOfRandomCity retorna, é retirado da call stack, deixando-a vazia
13. ficamos esperando pela chamada de http://wttr.in/${city} nos responder
14. uma vez que a resposta chegue, o evento de ‘end’ é disparado
15. o handler anônimo que passamos para .end() é chamado, é colocado na call stack com todos as variáveis locais, o que significa que ele pode ver e modificar os valores de express, superagent, app, CITIES, request, response, city e todas funções que definimos
16. response.send() é chamado com um status code de 200 ou 500, mas isso também é executado em uma thread do pool para a stream de respostas não fique bloqueada e o handler anônimo é retirado da pilha.

E é assim que tudo funciona!

Vale salientar que por padrão o pool de threads da libuv inicia com 4 threads concorrentes e que isso pode ser configurado conforme a sua necessidade.

##Microtasks e Macrotasks

Além disso, como se não fosse o bastante, nós temos duas task queues, não apenas uma. Uma task queue para microtasks e outra para macrotasks.

Exemplos de microtasks

- process.nextTick
- promises
- Object.observe

Exemplos de macrotasks

- setTimeout
- setInterval
- setImmediate
- I/O

Para mostrar isso na prática, vamos dar uma olhada no seguinte código (note que uso promises aqui):

```
console.log('script iniciando')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {  
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
})
```

```
console.log('script iniciando')
 
const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)
 
setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)
 
Promise.resolve().then(() => {  
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
})
a saída no console é:

script iniciando  
promise1  
promise2  
setInterval  
setTimeout1  
promise3  
promise4  
setInterval  
setTimeout2  
setInterval  
promise5  
promise6
```

```
script iniciando  
promise1  
promise2  
setInterval  
setTimeout1  
promise3  
promise4  
setInterval  
setTimeout2  
setInterval  
promise5  
promise6
```

De acordo com a especificação da WHATWG, uma macrotask deve ser processada da macrotask queue em um ciclo do event loop. Depois que essa macrotask terminar, todas as microtasks existentes são processadas dentro do mesmo ciclo. Se durante este processamento de microtasks novas microtasks surgirem, elas são processadas também, até a microtask queue ficar vazia.

Este diagrama do site Rising Stack ilustra bem o event loop completo:

Em nosso caso:

### Ciclo 1:

- setInterval é agendado como (macro)task
- setTimeout 1 é agendado como task
- em Promise.resolve 1 ambos thens são agendados como microtasks
- a call stack está vazia e as microtasks executam
- Task queue: setInterval, setTimeout 1

### Ciclo 2:

- a microtask queue está vazia, logo o handler setInterval pode executar;
- outro setInterval é agendado como task, logo atrás de setTimeout 1
- Task queue: setTimeout 1, setInterval

### Ciclo 3:

- a microtask queue está vazia, logo o handler setTimeout 1 pode executar;
- promise 3 e promise 4 são agendadas como microtasks;
- handlers de promise 3 e promise 4 são executados
- setTimeout 2 é agendado como task
- Task queue: setInterval, setTimeout 2

### Ciclo 4:

- a microtask queue está vazia; logo o handler de setInteval pode executar;
- outro setInterval é agendado como task, logo atrás de setTimeout
- Task queue: setTimeout 2, setInterval

### Ciclo 5:

- o handler setTimeout 2 executa;
- promise 5 e promise 6 são agendadas como microtasks;
- os handlers de promise 5 e promise 6 executam encerrando o programa.
N
ota: isso funciona perfeitamente bem no Google Chrome, mas por questões que fogem da minha compreensão, não é regra em todos ambientes de execução. Existem modificações que podemos fazer no código para que o comportamento seja o mesmo em todos ambientes, mas deixam o código terrivelmente feio (i.e. callback hell).

## Conclusões

Como você pôde ver, se quisermos ter total controle de nossas aplicações Node.js devemos prestar atenção nestes detalhes de como as tarefas são executadas dentro do event loop, principalmente para não bloquearmos sua execução sem querer.

O conceito do event loop pode ser um tanto complicado no início mas uma vez que você entender sue funcionamento na prática você não conseguirá mais imaginar sua vida sem ele. Obviamente o uso inicial intenso de callbacks é muito chato de gerenciar mas já é possível usar Promises em nossos códigos Javascript que permitem deixar as tarefas assíncronas mais inteligíveis e em breve devemos ter acesso ao recurso async-await com o ES7.

Outra dica é que você também pode enviar seus processamentos longos (mas que não são operações de IO), que normalmente seriam executados na thread principal para as threads em background usando bibliotecas como async.js ou filas no RabbitMQ.

[Artigo original](https://www.luiztools.com.br/post/entendendo-o-nodejs-event-loop/)