import "../../styles/conteo.css";

function Conteo() {
  let numero = "10.000";
  return (
    <>
   
      <h1 className="txt-index mrg-general">
        {numero}
       </h1>

      <h2 className="mrg-general txt-comp">
      Personas a tiempo real
      </h2>
    </>
  );
}
export default Conteo;
