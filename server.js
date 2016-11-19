var express = require('express'),
    fileupload = require("express-fileupload"),
    dna = require('dna2json'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    queries = require("./queries"),
    pug = require("pug"),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(fileupload());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.locals.pretty = true; // indent produces HTML for clarity


app.get('/', function(req, res) {
  res.render('index');
});

app.get("/results", function(req, res) {
    res.redirect(301, '/');
});

app.post("/results", function(req, res) {

    if (JSON.stringify(req.body) === '{"action":""}' ) {
      res.redirect(301, '/');
      return;
    } 

  
  if(req.files.archivo_adn.name !== ""){
    var file = req.files.archivo_adn;
    file.mv("archivo_adn.txt", function(err) {
      if (err) {
        res.send("ERROR con el archivo enviado.");
        return;
      } else {
        var txt = fs.readFileSync('archivo_adn.txt', 'utf8');
        dna.parse(txt, function(err, snps) {
          if (err) {
            res.send("ERROR En conversión a SNPS");
            return;
          } else {
              console.log("Datos del archivo enviado");
              askAdn(req, res, snps);
          }
        });
      }
    });
  } else {
      console.log("Datos del archivo demo");
      askAdn(req, res, require("./demo-adn.json"));
    }
});

function askAdn (req, res, adn){
    var data = [];
    if (req.body) {
        for (var item in req.body) {
          data.push(queries[item](adn));
        }
    }
    res.render("index", {datos: data});
}

app.listen(process.env.PORT || 3000);