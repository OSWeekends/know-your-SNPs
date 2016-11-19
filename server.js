var express = require('express');
var fileupload = require("express-fileupload");
var app = express();

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
        }
    });

    res.send("File Uploaded");

});

app.listen(process.env.PORT || 3000);