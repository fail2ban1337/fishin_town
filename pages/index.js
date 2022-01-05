import styled from "styled-components";
import React, { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import Rods from "../layouts/Rods";
import Stats from "../layouts/Stats";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const Container = styled.div``;

export default function Home() {
  const { rodsState, rodsDispatch } = useContext(GlobalContext);
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER,
  };
  return (
    <Provider template={AlertTemplate} {...options}>
      <Container>
        <Stats />
        <Rods />
      </Container>
    </Provider>
  );
}
