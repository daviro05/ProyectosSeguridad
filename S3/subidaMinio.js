function upload() {

    var ficheros = document.getElementById("archivos").files;
    document.querySelector('.btn-subir').style.display = "none";
    var ambito = document.querySelector('#sel1').value;
    console.log("Ámbito: " + ambito + " - Ficheros: " + ficheros.length);

    Array.from(ficheros).forEach(elemento => {
        var file = elemento;
        // Retrieve a URL from our server.
        retrieveNewURL(file,ambito,url => {
          // Upload the file to the server.
          uploadFile(file, url);
        })
    });
}

 // Request to our Node.js server for an upload URL.
 function retrieveNewURL(file,ambito, cb) {
    //document.querySelector('#loader').style.display = "block";

    $.get(`/subirFichero?name=${file.name}&ambito=${ambito}`, (url) => {
      cb(url)
    })
  }
 
  // Use XMLHttpRequest to upload the file to S3.
  function uploadFile(file,url) {
      var xhr = new XMLHttpRequest ()

      xhr.open('PUT', url, true);

    xhr.onloadstart = function (e) {
        console.log("Subiendo... "+file.name);
        $('#status').text(`Subiendo ${file.name}...`);
    }

    xhr.onloadend = function (e) {
        $('#status').text(`Subido ${file.name}.`);
        console.log(file.name + " subido con éxito");
    }

    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            console.log(e.loaded/1000000+  " / " + e.total/1000000);
        }
        if(e.loaded == e.total){
            document.querySelector('#loader').style.display = "none";
            document.querySelector('.tick').style.display = "block";
        }
        else{
            document.querySelector('.tick').style.display = "none";
            document.querySelector('#loader').style.display = "block";
        }
    }

      xhr.send(file)
  }