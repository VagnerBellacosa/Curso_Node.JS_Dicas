# Node.Js

## O que é Node.js e outras 5 dúvidas fundamentais
##### Luiz Duarte

## 1 – O que é Node.js?

Node.js não é uma linguagem de programação. Você programa utilizando a linguagem JavaScript, a mesma usada há décadas no client-side das aplicações web. Javascript é uma linguagem de scripting interpretada, embora seu uso com Node.js guarde semelhanças com linguagens compiladas, uma vez que máquina virtual V8 (veja mais adiante) faz etapas de pré-compilação e otimização antes do código entrar em operação.

Node.js não é um framework Javascript. Ele está mais para uma plataforma de aplicação, na qual você escreve seus programas com Javascript que serão compilados, otimizados e interpretados pela máquina virtual V8. Essa VM é a mesma que o Google utiliza para executar Javascript no browser Chrome, e foi a partir dela que o criador do Node.js, Ryan Dahl, criou o projeto. O resultado desse processo híbrido é entregue como código de máquina server-side, tornando o Node.js muito eficiente na sua execução e consumo de recursos.

Node.js é uma tecnologia assíncrona que trabalha em uma única thread de execução. Por assíncrona entenda que cada requisição ao Node.js não bloqueia o processo do mesmo, atendendo a um volume absurdamente grande de requisições ao mesmo tempo mesmo sendo single thread. Para lidar bem com isso, você terá de aprender callbacks e promises (clique no link se quiser aprender).

Imagine que existe apenas um fluxo de execução (chamado de Event Loop). Quando chega uma requisição, ela entra nesse fluxo, a máquina virtual Javascript verifica o que tem de ser feito, delega a atividade (consultar dados no banco, por exemplo) e volta a atender novas requisições enquanto este processamento paralelo está acontecendo. Quando a atividade termina (já temos os dados retornados pelo banco), ela volta ao fluxo principal para ser devolvida ao requisitante.

Isso é diferente do funcionamento tradicional da maioria das linguagens de programação, que trabalham com o conceito de multi-threading, onde, para cada requisição recebida, cria-se uma nova thread para atender à mesma. Isso porque a maioria das linguagens tem comportamento bloqueante na thread em que estão, ou seja, se uma thread faz uma consulta pesada no banco de dados, a thread fica travada até essa consulta terminar.

Esse modelo de trabalho tradicional, com uma thread por requisição (multi-thread) é mais fácil de programar, mas mais oneroso para o hardware, consumindo muito mais recursos.

##2 – Quais as vantagens do Node.js?

Node.js usa Javascript. Javascript tem algumas décadas de existência e milhões de programadores ao redor do mundo. Qualquer pessoa sai programando em JS em minutos e você contrata programadores facilmente para esta tecnologia. O mesmo não pode ser dito das plataformas concorrentes (veja mais adiante).

Node.js permite Javascript full-stack. Uma grande reclamação de muitos programadores web é ter de trabalhar com linguagens diferentes no front-end e no back-end. Node.js resolve isso ao permitir que você trabalhe com JS em ambos, principalmente se usar frameworks modernos de front como React. Inclusive eu possuo um treinamento para fullstack JS, se quiser conhecer.

Node.js é muito leve e é multiplataforma. Isso permite que você consiga rodar seus projetos em servidores abertos e com o SO que quiser, diminuindo bastante seu custo de hardware (principalmente se estava usando Java antes) e software (se pagava licenças de servidor Windows). Só a questão de licença de Windows que você economiza em players de datacenter como Amazon chega a 50% de economia, fora a economia de hardware que em alguns projetos meus chegou a 80%.

##3 – Quais as desvantagens do Node.js?

**Node.js** usa **Javascript**. Para quem gosta de linguagens rígidas como Java e C# (como eu, confesso), isso incomoda bastante. Não ter orientação à objetos do jeito que estamos acostumados (ainda assim tem classes), a tipagem ser fraca (mesmo usando TypeScript), não ter uma compilação “tradicional’, etc.

Agora se você veio do PHP e outras linguagens mais dinâmicas, provavelmente não vai sentir falta de nada.

JavaScript tem um ecossistema gigantesco. Sim, isso é uma vantagem também. Mas atire a primeira pedra quem nunca ficou atordoado com a quantidade absurda de frameworks e pacotes para Node.js (o NPM é o maior repositório de bibliotecas de programação do mundo), muitas vezes sendo bem difícil de separar o “joio do trigo” e decidir o que usar no seu projeto. Enquanto que eu procuro recomendar sempre que se comece pelo Express, você tem à disposição muitas outras opções como Adonis, Nest, Koa, Sails, Restify, Fastify…sem falar de soluções para front como EJS, Pug, Handlebars, Nunjucks, React, Vue, Angular, Next…

Node.js é assíncrono. Isso é um pouco chato de se acostumar dependendo da complexidade de cada uma das suas requisições, uma vez que o uso demasiado de callbacks pode gerar o chamado callback hell com um aninhamento extenso de funções e uma complexidade absurda de depuração, o que é resolvido parcialmente com o uso de Promises (ES6) e completamente com Async/Await (ES7). No vídeo sobre programação assíncrona que listei antes, você aprende mais sobre isso.

##4 – Para quê serve Node.js?

Serve para fazer o que você quiser, desde sites à scripts de automação. No entanto, usos ideais de Node.js seriam:

Node.js serve para fazer APIs. Esse talvez seja o principal uso da tecnologia, uma vez que por default ela apenas sabe processar requisições. Não apenas por essa limitação, mas também porque seu modelo não bloqueante de tratar as requisições o torna excelente para essa tarefa consumindo pouquíssimo hardware.

Node.js serve para fazer backend de jogos, IoT e apps de mensagens. Sim eu sei, isso é praticamente a mesma coisa do item anterior, mas realmente é uma boa ideia usar o Node.js para APIs nestas circunstâncias (backend-as-a-service) devido ao alto volume de requisições que esse tipo de aplicações efetuam.

Node.js serve para fazer aplicações de tempo real. Usando algumas extensões de web socket com Socket.io, Comet.io, etc é possível criar aplicações de tempo real facilmente sem onerar demais o seu servidor como acontecia antigamente com Java RMI, Microsoft WCF, etc.

##5 – Quais são os concorrentes do Node.js?

Embora muitos costumem comparar Node.js com tecnologias mais comuns como PHP, Python e Ruby, elas não são de fato concorrentes do Node se a gente comparar o propósito específico de cada uma. Sendo assim, os concorrentes mais adequados para o Node.js seriam:

Node.js vs Go. Linguagem criada pelo Google, o Go tem um modelo alternativo para lidar com threads também, que é muito mais leve do que o modelo tradicional do Java, C#, etc tornando-o muito poderoso e leve como um Node.js mas mais parecido com o C (mais estrito).

Node.js vs Scala. Considerado por muitos uma evolução do Java, é apontado por muitos como o sucessor definitivo do mesmo, embora ainda esteja engatinhando. Em tese ela tem as mesmas vantagens do Java (escala, segurança, velocidade), sem a desvantagem da linguagem mais datada e o consumo excessivo de recursos.

Node.js vs Elixir. O mais desconhecido dos três, ficou popular após a ascensão do Whatsapp como maior mensageiro instantâneo do mundo. Para quem não sabe, o Whatsapp usa Elixir, que roda sobre uma máquina virtual Erlang, com características parecidas com as do Node.js e paradigma funcional.

Claro que se você procurar, vai encontrar frameworks PHP para que ele opere igual ao Node. Ou mesmo comparações de performance de .NET Core mostrando superioridade contra Node. No entanto, dado a origem do Node e das demais tecnologias que conheço, as que mais se assemelham em proposta são as três que citei acima.

##6 – O que é usado em conjunto?

Como mencionei anteriormente, o Node.js em si é apenas uma plataforma para hospedar aplicações JavaScript. É através do fantástico ecossistema do NPM, o gerenciador e principal repositório de pacotes para Node.js, que temos acesso a milhões de pacotes, módulos, bibliotecas, etc. Abaixo vou citar apenas algumas possibilidades populares com Node:

Node.js + Express. Framework web mais famoso para Node.js. Inclui suporte a diferentes view engines (como EJS), funciona com diversos padrões incluindo MVC, possui JSON e HTTP na caixa, trabalha com URLs amigáveis nativamente e muito mais, sem deixar de ser bem leve, o tornando indispensável para APIs e aplicações web escritas em Node.

Node.js + Bancos de Dados: você pode utilizar tanto com bancos relacionais quanto com não-relacionais (clique no link para ver os tutoriais):

- MySQL
- PostgreSQL
- MS SQL Server
- MongoDB
- Redis
- SQLite

Node.js + ReactJS. A principal biblioteca para front-ends modernos e reativos da atualidade. Você encontra ótimos tutoriais aqui para aprender a criar aplicações com esta dupla.

	- Node.js + Segurança. Tem muita biblioteca pronta para auxiliar a colocar segurança nas suas aplicações Node.js.
	- Autenticação de aplicações: recomendo o Passport, um módulo de autenticação muito versátil e poderoso.
	- Autenticação de APIs: recomendo JWT, um padrão moderno e largamente utilizado.
	
[Artigo original](https://www.luiztools.com.br/post/o-que-e-nodejs-e-outras-5-duvidas-fundamentais/?utm_source=google&utm_medium=cpc&utm_campaign=902557428&utm_content=127000463008&utm_term=o%20que%20node%20js&gclid=Cj0KCQjwiqWHBhD2ARIsAPCDzal5MHlsU8W9FHRRFEdvWq2jzxG8i7MLW30rqLsXsl_lXZ_gd1ZHlKYaAtv6EALw_wcB)
