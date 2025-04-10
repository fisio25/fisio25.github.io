function mostrarTextos() {
    // Seleccionamos el div con los textos
    var textos = document.getElementById('textos');
    
    // Cambiamos su visibilidad, si está oculto lo mostramos, si está visible lo ocultamos
    if (textos.style.display === "none" || textos.style.display === "") {
        textos.style.display = "block";
    } else {
        textos.style.display = "none";
    }
}