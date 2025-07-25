import "../styles/navbar.css";

interface Props {
  Titulo: string;
  children: String;
}

function Navbar(props: Props) {
  const { Titulo, children } = props;

  return (
    <>
    <h1></h1>
    </>
  );
}
export default Navbar;
