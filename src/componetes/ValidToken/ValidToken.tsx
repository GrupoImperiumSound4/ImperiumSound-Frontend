

export const ValidToken = async () => {
    const apiUrl = import.meta.env.VITE_API_URL ?? "https://imperiumsound-backend-production.up.railway.app";
 
  try {
    const response = await fetch(`${apiUrl}/valid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "Error desconocido";

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
       
        return null;
      } catch (e) {
        console.log(e)
      }

      throw new Error(`Error de validación del token: ${errorMessage}`);
    }

    const data = await response.json(); 
    console.log(data)
    return { ...data }; 
  } catch (e) {
    
    return { error: e }; 
  }
  
};