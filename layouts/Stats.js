import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const StateBack = styled.div`
  background-image: "./waterBG1.png";
  width: 100%;
  background-image: url("/waterBG1.png");
  background-size: cover;
  height: 504px;
  background-position: center bottom;
  position: absolute;
`;
const StateContainer = styled.div`
  position: relative;
  max-width: 1170px;
  width: 90%;
  margin: 0 auto;
  padding: 0px;
`;
const MainImage = styled.img`
  width: 100%;
  margin: unset;
`;
const StateRow = styled.div`
  display: flex;
`;
const StateCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  div:first-of-type {
    font-size: 20px;
    font-weight: 600;
    color: white;
  }
  div:last-of-type {
    color: black;
    font-weight: 400;
    margin-top: 9px;
    font-size: 48px;
    line-height: 52px;
  }
`;
export default function Stats() {
  const [state, setstate] = useState({
    traded: "",
    players: "",
    listed: "",
    volume: "",
    floor: "",
  });
  useEffect(() => {
    async function getRods() {
      const result = await axios({
        method: "get",
        url: "https://marketplace-service-v2.fishingtown.io/v1/token-addresses/0x535FA6279B4a260B42379e05e8BCc0573eD0A70d/stats",
      });
      setstate(result.data);
    }
    getRods();
  }, []);
  return (
    <>
      <StateBack />
      <StateContainer>
        <MainImage src="./main_header.png" alt="main" />

        <StateRow>
          <StateCol>
            <div>TRADED</div>
            <div>{state.traded}</div>
          </StateCol>
          <StateCol>
            <div>TOTAL SUPPLY</div>
            <div>15K</div>
          </StateCol>
          <StateCol>
            <div>LISTED</div>
            <div>{state.listed}</div>
          </StateCol>
          <StateCol>
            <div>FLOOR(FHTN)</div>
            <div>{state.floor / 1000000000000000000}</div>
          </StateCol>
        </StateRow>
      </StateContainer>
    </>
  );
}
