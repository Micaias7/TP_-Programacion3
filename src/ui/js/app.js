document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const obtenerMiPerfil = async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/usuarios/mi-perfil",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!data.estado) {
      throw new Error(data.mensaje);
    }

    return data.datos;
  };

  try {
    const usuario = await obtenerMiPerfil();

    console.log("Usuario:", usuario);

    const perfilDiv = document.getElementById("perfilUsuario");

    let htmlPerfil = `
      <p><strong>Nombre:</strong> ${usuario.nombres}</p>
      <p><strong>Apellido:</strong> ${usuario.apellido}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Rol:</strong> ${usuario.rol}</p>
    `;

    if (usuario.foto_path) {
      const urlImagen = `http://localhost:3000/${usuario.foto_path}`;

      htmlPerfil += `
        <div class="foto-container">
          <img
            src="${urlImagen}"
            alt="Foto de perfil"
            class="perfil-img"
          >
        </div>
      `;
    } else {
      htmlPerfil += `<p>No tienes foto de perfil cargada.</p>`;
    }

    perfilDiv.innerHTML = htmlPerfil;
  } catch (error) {
    console.error(error);

    localStorage.removeItem("token");

    alert(error.message);

    window.location.href = "login.html";
  }

  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
