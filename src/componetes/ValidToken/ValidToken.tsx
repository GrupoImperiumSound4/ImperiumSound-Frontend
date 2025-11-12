export const ValidToken = async () => {
  const apiUrl = "http://localhost:8000";

  try {
    // ✅ PASO 1: Obtener token de localStorage
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      console.log("❌ [VALID_TOKEN] No hay token en localStorage");
      return null;
    }

    console.log("🎫 [VALID_TOKEN] Token encontrado, validando con el servidor...");

    // ✅ PASO 2: Enviar token al backend en el header Authorization
    const response = await fetch(`${apiUrl}/user/valid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ← IMPORTANTE: Enviar token aquí
      },
      credentials: "include",
    });

    // ✅ PASO 3: Verificar respuesta
    if (!response.ok) {
      console.log(`❌ [VALID_TOKEN] Token inválido. Status: ${response.status}`);
      // Limpiar localStorage si el token no es válido
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      return null;
    }

    const data = await response.json();
    console.log("✅ [VALID_TOKEN] Token válido. Usuario:", data);
    return data;
    
  } catch (error) {
    console.error("❌ [VALID_TOKEN] Error de red:", error);
    // No limpiar localStorage aquí, puede ser un error temporal de red
    return null;
  }
};