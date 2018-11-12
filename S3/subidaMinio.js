function upload() {
    debugger;
    var ficheros = document.getElementById("archivos").files;
    document.querySelector('.btn-subir').style.display = "none";
    var restantes = ficheros.length;
    //console.dir(ficheros);

    var ambito = document.querySelector('#sel1').value;

    console.log("Ámbito: " + ambito + " - Ficheros: " + restantes);

    Array.from(ficheros).forEach(elemento => {
        var file = elemento;
        // Retrieve a URL from our server.
        retrieveNewURL(file,ambito,url => {
          // Upload the file to the server.
          uploadFile(file, restantes, url);
        })
        restantes--;
    });
}

 // Request to our Node.js server for an upload URL.
 function retrieveNewURL(file,ambito, cb) {

    console.log("Subiendo... "+file.name);
    $('#status').text(`Subiendo ${file.name}...`);
    document.querySelector('#loader').style.display = "block";

    $.get(`/subirFichero?name=${file.name}&ambito=${ambito}`, (url) => {
      cb(url)
    })
  }
 
  // Use XMLHttpRequest to upload the file to S3.
  function uploadFile(file, restantes, url) {
      var xhr = new XMLHttpRequest ()
      xhr.open('PUT', url, true)
      xhr.send(file)
      xhr.onload = () => {
        if (xhr.status == 200) {
            $('#status').text(`Subido ${file.name}.`);
            document.querySelector('#loader').style.display = "none";
            console.log(file.name + " subido con éxito");
        }
        if(restantes == 0)
            $('#status').text("Todos los ficheros subidos con éxito.");
      }

  }
