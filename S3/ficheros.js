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
  console.log("Arrastrando fichero")
  var dt = e.dataTransfer
  var files = dt.files
  document.getElementById("archivos").files = e.dataTransfer.files;
  e.preventDefault();
  handleFiles(files)
}

function handleFiles(files) {
  files = [...files];
  mostrar(files);
}

function mostrar(ficheros){
    // Hacemos que aparezca la información de los ficheros y el ámbito a elegir
    if(ficheros.length > 0){
        document.querySelector('#prep_subida').style.display = "block";
        document.querySelector('.info').innerHTML = ficheros.length + " ficheros seleccionados.";
    }
    else{
        document.querySelector('#prep_subida').style.display = "none";
        document.querySelector('.info').innerHTML = "";
    }

    document.querySelector(".tficheros").innerHTML = "";
    if(ficheros.length != 0)
        document.querySelector('.btn-subir').disabled = false;
    else
        document.querySelector('.btn-subir').disabled = true; 

    for (let index = 0; index < ficheros.length; index++) {
        document.querySelector(".tficheros").innerHTML += `<tr>
        <th scope="row">${index+1}</th>
        <td>${ficheros[index].name}</td>
        <td>${ficheros[index].size} bytes</td>
        <td>${ficheros[index].type}</td>
        </tr>`;
    }
}


$("#datos").click(function(){
    $(".cuadro-fich").fadeToggle("slow", "linear");
});