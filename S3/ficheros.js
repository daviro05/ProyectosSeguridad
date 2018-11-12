// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  mostrar(files);
}

function mostrar(ficheros){
    //var ficheros = document.getElementById("archivos").files;
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
    }
}

$("#hide").click(function(){
    $("p").hide();
});

$("#show").click(function(){
    $("p").show();
});

