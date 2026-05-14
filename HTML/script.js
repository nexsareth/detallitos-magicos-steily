window.onload = function() {

  // Botón WhatsApp
  var btnWhatsapp = document.getElementById("btn-whatsapp");
  btnWhatsapp.onclick = function() {
    window.open("https://wa.me/573107355178", "_blank");
  }

  // Botón hero
  var btnHero = document.getElementById("btn-hero");
  btnHero.onclick = function() {
    document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
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

// Abrir modal
window.verDetalle = function(img, nombre, precio, descripcion, mensaje) {
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-nombre").innerText = nombre;
  document.getElementById("modal-precio").innerText = precio;
  document.getElementById("modal-desc").innerText = descripcion;
  document.getElementById("modal-btn-wa").onclick = function() {
    window.open("https://wa.me/573107355178?text=Hola! Me interesa: " + mensaje, "_blank");
  }
  document.getElementById("modal").classList.add("visible");
}

// Cerrar modal
window.cerrarModal = function(event) {
  if (!event || event.target.id === "modal") {
    document.getElementById("modal").classList.remove("visible");
  }
}

// Cerrar con Escape
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") cerrarModal();
});