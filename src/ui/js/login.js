const URL_API = "http://localhost:3000/api/v1/auth";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const contrasenia = document.getElementById("contrasenia").value;
  const mensajeDiv = document.getElementById("mensaje");

  try {
    const response = await fetch(`${URL_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contrasenia }),
    });

    const data = await response.json();

    if (response.ok && data.estado) {
      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      mensajeDiv.style.color = "red";
      mensajeDiv.innerText = data.mensaje || "Credenciales incorrectas.";
    }
  } catch (error) {
    mensajeDiv.style.color = "red";
    mensajeDiv.innerText = "Error de conexión con el servidor.";
  }
});
