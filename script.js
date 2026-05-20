window.onload = function() {

  // Botón WhatsApp
  var btnWhatsapp = document.getElementById("btn-whatsapp");
  btnWhatsapp.onclick = function() {
    window.open("https://wa.me/573107355178", "_blank");
  }

  // Botón hero
  var btnHero = document.getElementById("btn-hero");
  btnHero.onclick = function() {
    mostrarSeccion("servicios");
    setTimeout(function() {
      document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

}

// Filtro de categorías
window.filtrar = function(categoria) {
  var productos = document.querySelectorAll(".producto");
  var botones = document.querySelectorAll(".cat-btn");

  botones.forEach(function(btn) {
    btn.classList.remove("activo");
  });

  event.target.classList.add("activo");

  productos.forEach(function(p) {
    var categorias = p.dataset.categorias;
    if (categoria === "todo" || categorias.includes(categoria)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// Variables de la galería
var mediaActual = 0;
var mediaLista = [];

// Abrir modal con galería
window.verDetalle = function(archivos, nombre, precio, descripcion, mensaje) {
  mediaLista = archivos;
  mediaActual = 0;

  document.getElementById("modal-nombre").innerText = nombre;
  document.getElementById("modal-precio").innerText = precio;
  document.getElementById("modal-desc").innerText = descripcion;
  document.getElementById("modal-btn-wa").onclick = function() {
    window.open("https://wa.me/573107355178?text=Hola! Me interesa: " + mensaje, "_blank");
  }

  actualizarGaleria();
  document.getElementById("modal").classList.add("visible");
}

// Actualizar imagen o video en la galería
function actualizarGaleria() {
  var contenido = document.getElementById("galeria-contenido");
  var archivo = mediaLista[mediaActual];
  var esVideo = archivo.endsWith(".mp4") || archivo.endsWith(".mov") || archivo.endsWith(".webm");

  if (esVideo) {
  contenido.innerHTML = '<video src="' + archivo + '" autoplay muted loop></video>';
} else {
  contenido.innerHTML = '<img src="' + archivo + '" alt="foto" onclick="verImagenCompleta(\'' + archivo + '\')">';
}

  // Actualizar puntos
  var puntos = document.getElementById("galeria-puntos");
  puntos.innerHTML = "";
  mediaLista.forEach(function(_, i) {
    var punto = document.createElement("button");
    punto.className = "punto" + (i === mediaActual ? " activo" : "");
    punto.onclick = function() { mediaActual = i; actualizarGaleria(); }
    puntos.appendChild(punto);
  });
}

// Cambiar foto o video con las flechas
window.cambiarMedia = function(direccion) {
  mediaActual = (mediaActual + direccion + mediaLista.length) % mediaLista.length;
  actualizarGaleria();
}

// Cerrar modal
window.cerrarModal = function(event) {
  if (!event || event.target.id === "modal") {
    document.getElementById("modal").classList.remove("visible");
    document.getElementById("galeria-contenido").innerHTML = "";
  }
}

// Ver imagen completa
window.verImagenCompleta = function(src) {
  document.getElementById("visor-img-src").src = src;
  document.getElementById("visor-img").style.display = "flex";
}

// Cerrar visor
window.cerrarVisor = function() {
  document.getElementById("visor-img").style.display = "none";
}

// Cerrar con Escape
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    cerrarVisor();
    cerrarModal();
  }
});

// Mostrar sección al hacer clic en el menú
window.mostrarSeccion = function(id) {
  var secciones = ["servicios", "nosotros", "contacto"];

  secciones.forEach(function(s) {
    var el = document.getElementById(s);
    if (s === id) {
      if (el.classList.contains("visible")) {
        el.classList.remove("visible");
      } else {
        el.classList.add("visible");
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      el.classList.remove("visible");
    }
  });
}
