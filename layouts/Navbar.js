import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
display: flex;
width: 100%;
position: relative;
`;
const ImageStyled = styled.img`
position: absolute;
left: 0;
top: 0;
z-index: 9999;
`;

export default function Navbar() {

  return (
    <Container>
      <ImageStyled
        src="/logo.png" // Make sure to put "/" sign
        alt="A picture"
        width={150}
        height={200}
      />
    </Container>
  );
}
