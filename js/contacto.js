const formulario = document.getElementById("formulario-contacto");
const respuesta = document.getElementById("respuesta");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  respuesta.textContent = `Gracias, ${nombre}. Te responderemos pronto.`;
  formulario.reset();
});
