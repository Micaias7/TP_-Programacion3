document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Si no hay token, lo mandamos a loguearse
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Función simple para decodificar el JWT en el frontend
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const usuario = parseJwt(token);
  const perfilDiv = document.getElementById("perfilUsuario");

  if (usuario) {
    // En base a la estructura de tu token, extraemos los datos.
    // Asegúrate de que foto_path esté viajando dentro del token cuando haces el jwt.sign en el backend.
    let htmlPerfil = `<p><strong>Email:</strong> ${usuario.email}</p>`;
    htmlPerfil += `<p><strong>Rol:</strong> ${usuario.rol}</p>`;

    if (usuario.foto_path) {
      // La ruta base debe ser la de tu backend
      const urlImagen = `http://localhost:3000/${usuario.foto_path}`;
      htmlPerfil += `
                <div class="foto-container">
                    <img src="${urlImagen}" alt="Foto de perfil" class="perfil-img">
                </div>
            `;
    } else {
      htmlPerfil += `<p>No tienes foto de perfil cargada.</p>`;
    }

    perfilDiv.innerHTML = htmlPerfil;
  }

  // Botón de Logout
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
