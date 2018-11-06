function upload() {

    var ficheros = document.getElementById("archivos").files;

    for (let index = 0; index < ficheros.length; index++) {
        var file = ficheros[index];
        // Retrieve a URL from our server.
        retrieveNewURL(file, url => {
        // Upload the file to the server.
        uploadFile(file, url)
        })
    }
}

function mostrar(){
    var ficheros = document.getElementById("archivos").files;
    if(ficheros.length != 0){
        $('.muestra').text(ficheros.length + " ficheros para subir");
        document.querySelector('.btn-subir').disabled = false;
    }
    else{
        $('.muestra').text("Seleccionar ficheros");
        document.querySelector('.btn-subir').disabled = true;
    }
}

// Request to our Node.js server for an upload URL.
function retrieveNewURL(file, cb) {
    console.log("Subiendo... "+file.name);
    $('#status').text(`Subiendo ${file.name}...`);
    $.get(`/subirFichero?name=${file.name}`, (url) => {
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
        console.log(file.name + " subido con éxito");
      }
    }
}