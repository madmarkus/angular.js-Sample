var http = require("http"),
    url = require("url"),
    path = require("path"),
    port = process.argv[2] || 8888;
    var fs = require('fs');


http.createServer(function(req, res) {

  var uri = url.parse(req.url).pathname;

    if (req.method == 'POST') {
      console.log("[200] " + req.method + " to " + req.url);
      req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());
      });
      req.on('end', function() {
        // empty 200 OK response for now
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end();
      });
    }else 
    if(req.method = 'GET'){
    var filename = path.join(process.cwd(), uri);

      path.exists(filename, function(exists) {
        if(!exists) {
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.write("404 Not Found\n");
          res.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {        
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
            return;
          }

          res.writeHead(200);
          res.write(file, "binary");
          res.end();
        });   
        }); 
    } else {
      console.log("[405] " + req.method + " to " + req.url);
      req.on('data', function(data){
        console.log(data.toString());
      })
      res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
      res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
    }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
