// Muestra en el pie la versión desplegada (version.txt lo crea el Dockerfile)
fetch("version.txt")
  .then((respuesta) => (respuesta.ok ? respuesta.text() : "desconocida"))
  .then((texto) => {
    document.getElementById("version").textContent = texto.trim();
  })
  .catch(() => {
    document.getElementById("version").textContent = "desconocida";
  });
