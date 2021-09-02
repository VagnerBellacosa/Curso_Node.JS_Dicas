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