function upload() {

    var ficheros = document.getElementById("archivos").files;
    var ambito = document.querySelector('#amb').value;

    document.querySelector('.btn-subir').disabled = true;
    document.querySelector('.info-subida').style.display = "block";
    document.querySelector('.cuadro-subida').style.display = "none";
    document.querySelector('.btn-subida').disabled = true;

    Array.from(ficheros).forEach(function (elemento, index) {
        var arrayFich = [];
        arrayFich.push(elemento,index);

        document.querySelector(".barras").innerHTML += `<div class="progress">
                    <div id="barra${index}" class="progress-bar progress-bar-striped" style="width:0%"></div>
                    </div>
                    <p id="infobarra${index}"></p>
                    <p id="time${index}"><p>`;

        // Retrieve a URL from our server.
        retrieveNewURL(arrayFich,ambito,url => {
          // Upload the file to the server.
          uploadFile(arrayFich,url);
        })
    });
}

 // Request to our Node.js server for an upload URL.
 function retrieveNewURL(arrayFich,ambito,cb) {
    $.get(`/subirFichero?name=${arrayFich[0].name}&ambito=${ambito}`, (url) => {
      cb(url)
    });
  }
 
  // Use XMLHttpRequest to upload the file to S3.
  function uploadFile(arrayFich, url) {
    var xhr = new XMLHttpRequest ()
    xhr.open('PUT', url, true);
    progreso(xhr,arrayFich);
    xhr.send(arrayFich[0]);
  }

  function progreso(xhr,arrayFich){

    var started_at = new Date();
    var seconds_elapsed, bytes_per_second, remaining_bytes, seconds;

    xhr.upload.onprogress = function (e) {
            document.querySelector("#infobarra"+arrayFich[1]).innerText = `Subiendo ${arrayFich[0].name}...`;

            if(e.lengthComputable){
                document.querySelector("#barra"+arrayFich[1]).innerText = Math.floor((e.loaded / e.total) * 100) + '%';
                document.querySelector("#barra"+arrayFich[1]).style.width = Math.floor((e.loaded / e.total) * 100) + '%';
        
                seconds_elapsed     =   ( new Date().getTime() - started_at.getTime() )/1000; 
                bytes_per_second    =   seconds_elapsed ? e.loaded / seconds_elapsed : 0 ;
                remaining_bytes     =   e.total - e.loaded;
                seconds             =   seconds_elapsed ? remaining_bytes / bytes_per_second : 'Calculando...' ;
                document.querySelector("#time"+arrayFich[1]).innerText = "Restante: "+(seconds/60).toFixed(0)+ " minutos";
            }
    }

    xhr.upload.onloadend = function (e) {
        console.log(arrayFich[0].name + " subido con éxito");
        document.querySelector("#infobarra"+arrayFich[1]).innerText = `${arrayFich[0].name} subido`;
        document.querySelector("#time"+arrayFich[1]).innerText = "";
    }
  }