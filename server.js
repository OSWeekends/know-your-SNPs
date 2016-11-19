var express = require('express');
var fileupload = require("express-fileupload");
var dna = require('dna2json');
var fs = require('fs');
var bodyParser = require('body-parser');
var queries = require("./queries")
var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(fileupload());
app.use(express.static(__dirname + '/public'));

app.post("/upload", function(req, res)
{
    var file;

    if(!req.files)
    {
        res.send("File was not found");
        return;
    }
    console.log(req.files)
    file = req.files.archivo_adn;  // here is the field name of the form

    file.mv("archivo_adn.txt", function(err) {
        if(err){
         console.log("ERRRORRR!!! ")
         res.send("ERRRRORRRRR!!")
        } else {
            
            var txt = fs.readFileSync('archivo_adn.txt', 'utf8');
            
            dna.parse(txt, function(err, snps){
                if(err){
                    console.log("ERROR En conversión a SNPS")
                }
                fs.writeFile('./archivo_adn.json', JSON.stringify(snps, null, 2) , 'utf-8', function(err){
                    if (err) return console.log(err);
                    var finalAdn = require('./archivo_adn.json')
                                    console.log(req.body)
                console.log(req.params)
                var data = {}
                if(req.params){
                    if(typeof req.body.norovirus !== "undefined"){
                        data.norovirus = queries.norovirus(finalAdn);
                    }
                    if(typeof req.body.gendermale !== "undefined"){
                        data.gendermale = queries.gendermale(finalAdn);
                    }
                }
                res.send(data);
                });

            });
        }
    });
});

app.listen(process.env.PORT || 3000);