const URL_API = "http://localhost:3000/api/v1/auth"; // Ajusta el puerto si es necesario

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const mensajeDiv = document.getElementById("mensaje");

    // Al usar FormData, capturamos todos los inputs que tengan el atributo "name"
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);

    try {
      const response = await fetch(`${URL_API}/register`, {
        method: "POST",
        body: formData,
        // IMPORTANTE: Al enviar FormData, fetch configura automáticamente
        // el Content-Type como 'multipart/form-data' con su boundary.
      });

      const data = await response.json();

      if (response.ok && data.estado) {
        mensajeDiv.style.color = "green";
        mensajeDiv.innerText = "Registro exitoso. Redirigiendo al login...";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        mensajeDiv.style.color = "red";
        mensajeDiv.innerText = data.mensaje || "Error al registrar.";
        console.error(data);
      }
    } catch (error) {
      mensajeDiv.style.color = "red";
      mensajeDiv.innerText = "Error de conexión con el servidor.";
    }
  });
