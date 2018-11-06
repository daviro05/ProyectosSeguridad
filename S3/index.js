var Minio = require('minio');
var FS = require('fs')

// Creamos el cliente. endPoint en este caso es localhost, el puerto 9000
// Y ponemos el access key y secret key que nos da el servidor.

var client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'LU6GVEXUV702YU0V1A0A',
    secretKey: 'NU1jtOQK9BWbQ5V5itZBuGsHTYdkj00VUaMtxOpx'
});


client.bucketExists('bucketjs', function (err, exists) {
    console.log('Conexion correcta')
    if (err) {
        return console.log(err)
    }
    if (exists) {
        return console.log('Bucket exists.')
    }
    else {
        client.makeBucket('bucketjs', function (err) {
            if (err) return console.log(err)
            console.log('Bucket creado con exito.')
        });
    }
});


function upload () {


    var ficheros = document.getElementById("archivos").files;
    document.querySelector('.btn-subir').disabled = true;
    document.querySelector("#status").innerHTML = "Subiendo ficheros...";
    document.querySelector("#loader").style.display = "block";

    for (let index = 0; index < ficheros.length; index++) {

        var file = ficheros[index];
        var fileStream = FS.createReadStream(file)

        var fileStat = FS.stat(file, function (err, stats) {

            if (err) {
                return console.log(err)
            }
            client.putObject('mybucket', 'prueba', fileStream, stats.size, function (err, etag) {
                if (err) return console.log(err, etag)
                //completado(file);
            });
        });
    }
}

function mostrar(){
    var ficheros = document.getElementById("archivos").files;
    console.log(ficheros);

    if (ficheros.length != 0) {
        document.querySelector(".muestra").innerHTML = ficheros.length + " ficheros para subir";
        document.querySelector('.btn-subir').disabled = false;
    }
    else {
        document.querySelector(".muestra").innerHTML = "Seleccionar ficheros";
        document.querySelector('.btn-subir').disabled = true;
    }
}

function completado(file) {
    console.log(file.name + " subido con éxito");
    document.querySelector(".muestra").innerHTML = "Seleccionar ficheros";
    document.querySelector("#status").innerHTML = "Subida realizada con éxito";
    document.querySelector('.btn-subir').disabled = false;
    document.querySelector("#loader").style.display = "none";

}