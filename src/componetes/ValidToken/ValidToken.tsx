export const ValidToken = async () => {
  const apiUrl = "https://imperium-sound-backend.vercel.app";

  try {
    const response = await fetch(`${apiUrl}/valid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.log(`❌ Token inválido. Status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log("✅ Token válido. Datos del usuario:", data);
    return data ;
    
  } catch (error) {
    console.error("❌ Error validando token:", error);
    return null;
  }
};