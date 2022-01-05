import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { searchRods } from "../context/actions/searchRods";
import { GlobalContext } from "../context/Provider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAlert } from "react-alert";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Container = styled.div`
  height: 1000px;
  width: 100%;
  margin-top: 350px;
`;
const CardsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  .uncommun {
    background: rgb(166, 242, 195);
  }
  .rare {
    background: rgb(192, 234, 255);
  }
  .legend {
    background: rgb(255, 237, 214);
  }
  .mythical {
    background: rgb(233, 215, 255);
  }
  .immortal {
    background: rgb(255, 243, 174);
  }
`;
const Card = styled.div`
  height: 300px;
  background: whitesmoke;
  flex-basis: 20%;
  border-radius: 0px 50px 0 0;
  position: relative;
  &:hover {
    .test {
      display: block;
      cursor: pointer;
    }
  }
  .test {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
    height: 40px;
    width: 100px;
    background: #f1b146;
    border-radius: 15px;
    text-align: center;
    line-height: 40px;
    color: white;
    font-size: 30px;
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    transform: scale(0.5);
    object-fit: contain;
    image-rendering: pixelated;
  }
`;
const Rarity = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(176, 101, 30);
  border-radius: 0px 15px;
  padding: 5px 20px;
  font-size: 25px;
  color: white;
`;
const CardCol = styled.div`
  margin-right: 10px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;
const RodInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const RodName = styled.div`
  font-size: 20px;
`;
const RodPrice = styled.div`
  font-size: 30px;
  color: rgb(88, 189, 125);
`;
const RodInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RodDurability = styled.div`
  color: rgb(88, 189, 125);
`;

const RodPriceUsd = styled.div`
  font-size: 15px;
`;
const Raritys = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Rarity_Commun = styled.div`
  margin: 0 auto;
  background: whitesmoke;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Rarity_Uncommun = styled.div`
  margin: 0 auto;
  background: rgb(166, 242, 195);
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
`;
const Rarity_Rare = styled.div`
  background: rgb(192, 234, 255);
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
`;
const Rarity_Legend = styled.div`
  background: rgb(255, 237, 214);
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
  .legendNumber {
    position: absolute;
    padding: 10px;
    top: -10px;
    left: -10px;
    border-radius: 50%;
    background: whitesmoke;
    font-size: 20px;
  }
`;
const Rarity_Mythical = styled.div`
  background: rgb(233, 215, 255);
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
`;
const Rarity_Immortal = styled.div`
  background: rgb(255, 243, 174);
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px 50px;
  border-radius: 0 15px;
`;

const PriceInput = styled.input`
  width: 80px;
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid transparent;
  text-align: center;
`;
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  p {
    margin-right: 5px;
  }
`;

const ButtonPrice = styled.button`
  padding: 20px 30px;
  margin: 30px auto;
  display: block;
  border-radius: 10px;
  border: none;
  :hover {
    cursor: pointer;
    background: #f1b146;
  }
`;

export default function Rods() {
  if (typeof document === "undefined") {
    // during server evaluation
  } else {
    let audio = document.getElementById("audio");

    // during client's browser evaluation
  }
  const alert = useAlert();

  const { rodsState, rodsDispatch } = useContext(GlobalContext);
  const [priceCheck, setPriceCheck] = useState({
    commun_price: 300,
    uncommun_price: 500,
    rare_price: 1000,
    legend_price: 2000,
    mythical_price: 3000,
    immortal_price: 4000,
  });

  console.log(rodsState);
  function handleInputChange(e) {
    // rodsDispatch({
    //   type: e.target.name,
    //   payload: e.target.value,
    // });
    setPriceCheck({
      ...priceCheck,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    rodsDispatch({
      type: "SET_PRICE_CHECK",
      payload: priceCheck,
    });
  }

  const {
    commun_price,
    uncommun_price,
    rare_price,
    legend_price,
    mythical_price,
    immortal_price,
  } = priceCheck;
  if (
    rodsState.rarity.commun >= 1 ||
    rodsState.rarity.uncommun >= 1 ||
    rodsState.rarity.rare >= 1 ||
    rodsState.rarity.legend >= 1 ||
    rodsState.rarity.mythical >= 1 ||
    rodsState.rarity.immortal >= 1
  ) {
    audio.play();
    alert.show("Get that rood");
  }

  useEffect(() => {
    async function getRods() {
      await searchRods(rodsDispatch);
    }
    const interval = setInterval(() => {
      getRods();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (rodsState.isLoading) {
    return false;
  }
  return (
    <Container>
      <Raritys>
        <Rarity_Commun>
          <p>commun rarity</p>
          <InputRow>
            <PriceInput
              value={commun_price}
              name="commun_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.commun}</div>
        </Rarity_Commun>
        <Rarity_Uncommun>
          <p>uncomun rarity</p>
          <InputRow>
            <PriceInput
              value={uncommun_price}
              name="uncommun_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.uncommun}</div>
        </Rarity_Uncommun>
        <Rarity_Rare>
          <p>rare rarity</p>
          <InputRow>
            <PriceInput
              value={rare_price}
              name="rare_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.rare}</div>
        </Rarity_Rare>
        <Rarity_Legend>
          <p>legend rarity</p>
          <InputRow>
            <PriceInput
              value={legend_price}
              name="legend_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.legend}</div>
        </Rarity_Legend>
        <Rarity_Mythical>
          <p>mythical rarity</p>
          <InputRow>
            <PriceInput
              value={mythical_price}
              name="mythical_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.mythical}</div>
        </Rarity_Mythical>
        <Rarity_Immortal>
          <p>immortal rarity</p>
          <InputRow>
            <PriceInput
              value={immortal_price}
              name="immortal_price"
              placeholder="price"
              onChange={(e) => handleInputChange(e)}
            />
          </InputRow>
          <div className="communNumer">{rodsState.rarity.immortal}</div>
          <audio id="audio">
            <source src="./notificaton.wav" type="audio/mp3"></source>
          </audio>
        </Rarity_Immortal>
      </Raritys>
      <ButtonPrice onClick={(e) => handleSubmit(e)}>Change Price</ButtonPrice>
      <CardsContainer>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_common") {
              return (
                <CardCol key={index}>
                  <Card>
                    <img src={value.image} />
                    <div className="test">
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>
                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_uncommon") {
              return (
                <CardCol key={index}>
                  <Card className="uncommun">
                    <img src={value.image} />
                    <div className="test">
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>

                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_rare") {
              return (
                <CardCol key={index}>
                  <Card className="rare">
                    <img src={value.image} />
                    <div className="test">
                      {" "}
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>

                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_legendary") {
              return (
                <CardCol key={index}>
                  <Card className="legend">
                    <img src={value.image} />
                    <div className="test">
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>

                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_mythical") {
              return (
                <CardCol key={index}>
                  <Card className="mythical">
                    <img src={value.image} />
                    <div className="test">
                      {" "}
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>

                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
        <Carousel responsive={responsive}>
          {Object.values(rodsState.rod).map((value, index) => {
            if (value.rarity === "rarity_immortal") {
              return (
                <CardCol key={index}>
                  <Card className="immortal">
                    <img src={value.image} />
                    <div className="test">
                      {" "}
                      <a
                        href={`https://market.fishingtown.io/nft/${value.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </div>

                    <Rarity>{value.enhance}</Rarity>
                  </Card>
                  <RodInfo>
                    <RodName>{value.name}</RodName>
                    <RodInfoRow>
                      <RodPrice>{value.price.toFixed(0)} FHTN</RodPrice>
                      <RodDurability>
                        {value.durability} durability
                      </RodDurability>
                    </RodInfoRow>
                    <RodPriceUsd>
                      ({(value.price * rodsState.fhtnPrice).toFixed(2)} USD)
                    </RodPriceUsd>
                  </RodInfo>
                </CardCol>
              );
            }
          })}
        </Carousel>
      </CardsContainer>
    </Container>
  );
}
