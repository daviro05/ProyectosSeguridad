var Minio = require('minio')

// Creamos el cliente. endPoint en este caso es localhost, el puerto 9000
// Y ponemos el access key y secret key que nos da el servidor.

var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'LU6GVEXUV702YU0V1A0A',
    secretKey: 'NU1jtOQK9BWbQ5V5itZBuGsHTYdkj00VUaMtxOpx'
});

// Fichero que queremos subir.
var FS = require('fs')
var file = "epm.exe"
var fileStream = FS.createReadStream(file)

// Si el bucket que vamos a crear ya existe

minioClient.bucketExists('bucketjs', function (err, exists) {
    if (err) {
    }
    if (exists) {
        console.log('El bucket ya existe.')
        console.log('Subiendo...')
        // Realizamos la subida del fichero. Indicamos el bucket, el nombre que le queremos dar al fichero
        // La ruta del fichero
        var fileStats = FS.stat(file, function (err, stats) {
            minioClient.putObject('bucketjs', file, fileStream, stats.size, function (err, etag) {
                if (err) return console.log(err)
                console.log('Fichero subido con éxito.')
            });
        })

    }
    else {
        // Creamos un bucket llamado bucketJS.
        minioClient.makeBucket('bucketjs', function (err) {
            if (err) return console.log(err)
            console.log('Bucket creado con exito.')
        });
    }

});