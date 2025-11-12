import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ProtectedRoute } from "./componetes/Proteccion/protec_rutas";
import "./App.css";
import InicioSesion from "./paginas/InicioSesion";
import Registro from "./paginas/Registro";
import Fondo from "./componetes/Fondo/Fondo";
import Servicios from "./paginas/servicios";
import Nosotros from "./paginas/Nosotros";
import Objetivos from "./paginas/Objetivos";
import Feedback from "./paginas/Feedback";
import Caracteristicas from "./paginas/Caracteristicas";
import PagInicio from "./paginas/Inicio";
import Cuenta from "./paginas/PanelUsuario";
import MicroUP from "./paginas/MicroUP";
import Foro from "./paginas/Foro";
import Comparadorsonidos from "./paginas/comparador";
import Info from "./paginas/Info";
import JaviBlock from "./paginas/JaviBlock";
import Colegio from "./paginas/mapacolegio"
import DecibelGame from "./paginas/Juegoadivinardb";
import AdminPanel from "./paginas/paginaadmin"


function App() {
  return (
    <>
    <Fondo/>
      <Router>
        <Routes>
          <Route path="/" element={<PagInicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="/contactanos" element={<Feedback />} />
          <Route path="/caracteristicas" element={<Caracteristicas/>} />
          <Route path="/inicio" element={<PagInicio/>} />
          <Route path="/cuenta" element={<ProtectedRoute><Cuenta/></ProtectedRoute>}></Route>
          <Route path="/microConfig" element={<MicroUP/>}></Route>
          <Route path="/foro" element={<Foro/>}></Route>
          <Route path="/comparador-sonido" element= {<Comparadorsonidos/>}></Route>
          <Route path="/informacion" element= {<Info/>}></Route>
          <Route path="/javiblock" element= {<JaviBlock/>}></Route>
          <Route path="/colegio" element= {<Colegio/>}></Route>
          <Route path="/Juegodb" element= {<DecibelGame/>}></Route>
          <Route path="/PanelAdmin" element= {<AdminPanel/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
