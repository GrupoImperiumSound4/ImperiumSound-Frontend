export const ValidToken = async () => {
  const apiUrl = "https://imperium-sound-backend.vercel.app";

  try {
    console.log(" [VALID_TOKEN] Verificando token con el servidor...");

    const response = await fetch(`${apiUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔑 CRÍTICO: Esto envía la cookie automáticamente
    });

    console.log(` [VALID_TOKEN] Respuesta del servidor: ${response.status}`);

    // ✅ Verificar respuesta
    if (!response.ok) {
      console.log(`[VALID_TOKEN] Token inválido. Status: ${response.status}`);
      // Limpiar datos locales si el token no es válido
      localStorage.removeItem("user");
      return null;
    }

    const data = await response.json();
    console.log("✅ [VALID_TOKEN] Token válido. Usuario:", data);
    
    // Guardar datos del usuario en localStorage (opcional)
    localStorage.setItem("user", JSON.stringify(data));
    
    return data;
    
  } catch (error) {
    console.error("❌ [VALID_TOKEN] Error de red:", error);
    return null;
  }
};