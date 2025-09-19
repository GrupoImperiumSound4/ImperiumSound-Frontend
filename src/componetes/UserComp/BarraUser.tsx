import { useEffect, useState } from "react";
import "../../styles/User.css";
import { useNavigate } from "react-router-dom";
import { ValidToken } from "../ValidToken/ValidToken";

interface UserType {
  idUser: string;
  userName: string;
  nombre: string;
  email: string;
}
function BarraUser() {
  const navegar = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const Microfono = "/microConfig";
  const Soporte = "/soporte";
  const Info = "/cuenta";

  const loginEffect = async () => {
    const result = await ValidToken();

    if (result != null) {
      setUser(result);
      console.log(result);
      return;
    }

    navegar("/");
  };

  useEffect(() => {
    loginEffect();
  }, []);

  const nombre = user?.nombre;
  const email = "lola@gmail.com";

  return (
    <>
      <div className="ContenedorListaUser">
        <ul>
          <a onClick={() => navegar(Info)}>
            {" "}
            <li id="ListaUser">
              <h1>INFORMACION</h1>
            </li>
          </a>
          <a onClick={() => navegar(Microfono)}>
            {" "}
            <li id="ListaUser">
              <h1>MICROFONO</h1>
            </li>
          </a>
          <a onClick={() => navegar(Soporte)}>
            {" "}
            <li id="ListaUser">
              <h1>SOPORTE</h1>
            </li>
          </a>
        </ul>
        <div className="Linea"></div>
        <div className="ContenedorTxtUser">
          <h1 id="TitUser">INFORMACION PERSONAL</h1>
          <br />
          <br />
          <p id="TxtUser">Nombre: {nombre}</p>
          <br />
          <p id="TxtUser">Correo: {email}</p>
          <br />
          <p id="TxtUser">Se unió en Noviembre 8 del 2024</p>

          <div className="ContenedorUserFoto">
            <img
              id="ImagenUser"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
            ></img>
            <div className="ProfileInfo">
              <p>Estudiante</p>
              <p>Nombre de Usuario</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BarraUser;
