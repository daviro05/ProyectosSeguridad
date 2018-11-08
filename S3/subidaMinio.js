function upload() {

    var ficheros = document.getElementById("archivos").files;
    document.querySelector('.btn-subir').disabled = true;

    //console.dir(ficheros);

    var ambito = document.querySelector('#sel1').value;

    console.log(ambito);

    Array.from(ficheros).forEach(elemento => {
        var file = elemento;
        console.log(file.name);
        // Retrieve a URL from our server.
        retrieveNewURL(file,ambito, url => {
          // Upload the file to the server.
          uploadFile(file, url)
        })
    })
}

 // Request to our Node.js server for an upload URL.
 function retrieveNewURL(file,ambito,cb) {

    console.log("Subiendo... "+file.name);
    $('#status').text(`Subiendo ${file.name}...`);
    document.querySelector('#loader').style.display = "block";

    $.get(`/subirFichero?name=${file.name}&ambito=${ambito}`, (url) => {
      cb(url)
    })
  }
 
  // Use XMLHttpRequest to upload the file to S3.
  function uploadFile(file, url) {
      var xhr = new XMLHttpRequest ()
      xhr.open('PUT', url, true)
      xhr.send(file)
      xhr.onload = () => {
        if (xhr.status == 200) {
            $('#status').text(`Subido ${file.name}.`);
            document.querySelector('#loader').style.display = "none";
            //console.log(file.name + " subido con éxito");
        }
      }

  }


function mostrar(){
    var ficheros = document.getElementById("archivos").files;
    document.querySelector(".tficheros").innerHTML = "";
    if(ficheros.length != 0){
        $('.muestra').text(ficheros.length + " ficheros para subir");
        document.querySelector('.btn-subir').disabled = false;
        document.querySelector('.cuadro-fich').style.display = "block";
    }
    else{
        $('.muestra').text("Seleccionar ficheros");
        document.querySelector('.btn-subir').disabled = true;
        document.querySelector('.cuadro-fich').style.display = "none";
        
    }

    for (let index = 0; index < ficheros.length; index++) {
        document.querySelector(".tficheros").innerHTML += `<tr>
                                                <th scope="row">${index+1}</th>
                                                <td>${ficheros[index].name}</td>
                                                <td>${ficheros[index].size}</td>
                                                <td>${ficheros[index].type}</td>
                                                </tr>`;
        //console.log(ficheros[index]);
    }
}