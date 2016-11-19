(function(){
    var gifUrl = "http://www.canalgif.net/Gifs-animados/Ciencias/ADN/Imagen-animada-ADN-29.gif";
    document.getElementById("btn").addEventListener("click", function(){
        document.getElementById("form").submit();
        var content = "<img src='"+gifUrl+"'>";
        content += "<h3>Loading Data... <h3>";
        content += "<h4>It can take several minutes!</h4>";
        document.getElementById("form").innerHTML = content
    })
})()


