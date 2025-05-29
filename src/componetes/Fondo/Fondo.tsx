import {
  Circle,
  Circle1,
  Circle2,
  Circle3,
  Circle4,
  Circle5,
  Circle6,
  CircleF,
  Circle7,
  ContainerFondo,
  ContainerPrincipal,
} from "./style";

const Fondo = () => {
  return (
    <ContainerPrincipal>
      <ContainerFondo>
        <Circle />
        <CircleF />
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
        <Circle5 />
        <Circle6 />
        <Circle7/>
      </ContainerFondo>
    </ContainerPrincipal>
  );
};

export default Fondo;
