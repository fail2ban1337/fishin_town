import axios from "axios";
export const searchRods = async (disptch) => {
  try {
    const price = await axios({
      method: "get",
      url: "https://api.pancakeswap.info/api/v2/tokens/0x87be0b856960f57fb0104ef0922cd1dacbd37f64",
    });
    disptch({
      type: "FTHN_PRICE",
      payload: price.data.data.price,
    });
    const result = await axios({
      method: "get",
      url: "https://marketplace-service-v2.fishingtown.io/v1/items?offset=0&limit=12",
    });
    const sorted = result.data.data.sort(function (a, b) {
      return a.price - b.price;
    });
    // result.data.data.map((value, index) => {
    //   console.log(JSON.parse(value.metadata));
    // });
    disptch({
      type: "SET_RORDS",
      payload: sorted,
    });
  } catch (error) {
    console.log(error);
  }
};
