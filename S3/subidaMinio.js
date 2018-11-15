function upload() {

    var ficheros = document.getElementById("archivos").files;
    var ambito = document.querySelector('#amb').value;
    document.querySelector('.btn-subir').disabled = true;

    document.querySelector('.info-subida').style.display = "block";
    document.querySelector('.cuadro-subida').style.display = "none";
    

    console.log("Ámbito: " + ambito + " - Ficheros: " + ficheros.length);
    $('#status').text(`Preparando ficheros...`);

    var aux;

    Array.from(ficheros).forEach(function (elemento, index) {
        var file = elemento;
        // Retrieve a URL from our server.
        retrieveNewURL(file,ambito,url => {
          // Upload the file to the server.
          uploadFile(file, index, url);
        })
    });
}

 // Request to our Node.js server for an upload URL.
 function retrieveNewURL(file,ambito, cb) {
    $.get(`/subirFichero?name=${file.name}&ambito=${ambito}`, (url) => {
      cb(url)
    });
  }
 
  // Use XMLHttpRequest to upload the file to S3.
  function uploadFile(file, index, url) {
    var xhr = new XMLHttpRequest ()
    xhr.open('PUT', url, true);
    progreso(xhr,file,index);
    xhr.send(file);
  }


  function progreso(xhr,file,index){
    var started_at = new Date();
    var seconds_elapsed, bytes_per_second, remaining_bytes, seconds;

    xhr.upload.onprogress = function (e) {
        $('#status').text(`Subiendo ${file.name}...`);
        console.log(index)
        document.querySelector('.btn-subida').disabled = true;

        if(true){ //Condicion para meter varias barras
            if (e.lengthComputable) {
                //console.log(Math.floor((e.loaded / e.total) * 100) + '%');
                document.querySelector(".progress-bar").innerText = Math.floor((e.loaded / e.total) * 100) + '%';
                document.querySelector(".progress-bar").style.width = Math.floor((e.loaded / e.total) * 100) + '%';
            }

            seconds_elapsed =   ( new Date().getTime() - started_at.getTime() )/1000; 
            bytes_per_second =  seconds_elapsed ? e.loaded / seconds_elapsed : 0 ;
            remaining_bytes =   e.total - e.loaded;
            seconds = seconds_elapsed ? remaining_bytes / bytes_per_second : 'Calculando...' ;
            $('.time_re').text("Tiempo restante aproximado: "+(seconds/60).toFixed(0) + " minutos");
        }
    }

    xhr.upload.onloadend = function (e) {
        console.log(file.name + " subido con éxito");
        $('#status').text(`Subida completada`);
    }

  }