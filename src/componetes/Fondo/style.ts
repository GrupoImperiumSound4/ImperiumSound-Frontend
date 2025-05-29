import styled from 'styled-components';

export const ContainerPrincipal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #0f061e;
`;

export const ContainerFondo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 0, 255, 0.288) 1%, rgba(15, 6, 30, 0.801) 60%);
`;

export const CircleF = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, #402484 1%, #402484 80%);
`;

export const Circle1 = styled(Circle)`
  width: 80em;
  height: 80em;
  top: -70%;
  left: -40%;
`;

export const Circle2 = styled(Circle)`
  width: 60em;
  height: 60em;
  top: -70%;
  left: 40%;
`;

export const Circle3 = styled(CircleF)`
  width: 20px;
  height: 20px;
  top: 50%;
  left: 1%;
`;

export const Circle4 = styled(CircleF)`
  width: 14em;
  height: 14em;
  top: 90%;
  left: -5%;
`;

export const Circle5 = styled(CircleF)`
  width: 12em;
  height: 12em;
  top: 70%;
  left: 97%;
`;

export const Circle6 = styled(CircleF)`
  width: 20px;
  height: 20px;
  top: 30%;
  left: 90%;
`;
export const Circle7 = styled(CircleF)`
  width: 2em;
  height: 2em;
  top: 75%;
  left: 45%;
`;

