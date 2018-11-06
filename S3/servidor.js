var Minio = require('minio')
var express = require('express')

var app = express();

// Creamos el cliente. endPoint en este caso es localhost, el puerto 9000
// Y ponemos el access key y secret key que nos da el servidor.

var client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'LU6GVEXUV702YU0V1A0A',
    secretKey: 'NU1jtOQK9BWbQ5V5itZBuGsHTYdkj00VUaMtxOpx'
});


client.bucketExists('bucketjs', function(err, exists) {

    if (err) {
      return console.log(err)
    }
    if (exists) {
      return console.log('Bucket exists.')
    }
    else{
        client.makeBucket('bucketjs', function(err) {
            if (err) return console.log(err)
            console.log('Bucket creado con exito.')
        });
    }
  })


// express is a small HTTP server wrapper, but this works with any HTTP server


app.get('/subirFichero', (req, res) => {

     client.presignedPutObject('bucketjs', req.query.name, (err, url) => {
        if (err) throw err
        res.end(url)
    });
});


app.use('/', express.static('./'));

app.listen(8080, function () { console.log("El servidor está corriendo en el puerto 8080!"); })