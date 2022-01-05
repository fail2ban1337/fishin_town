const rods = (state, { payload, type }) => {
  const rarity = {
    commun: 0,
    uncommun: 0,
    rare: 0,
    legend: 0,
    mythical: 0,
    immortal: 0,
  };

  switch (type) {
    case "SET_RORDS":
      return {
        ...state,
        rod: payload.map((value, index) => {
          let obj = {};
          obj.token_id = value.token_id;
          obj.price = value.price / 1000000000000000000;
          const metaData = JSON.parse(value.metadata);
          obj.durability = metaData.durability;
          obj.image = metaData.prototype.image;
          obj.name = metaData.prototype.name;
          obj.rarity = metaData.prototype.rarity;
          obj.tier = metaData.prototype.tier;
          obj.enhance = metaData.enhance;
          if (
            obj.price <= state.price.commun_price &&
            obj.rarity === "rarity_common"
          ) {
            rarity.commun += 1;
          }
          if (
            obj.price <= state.price.uncommun_price &&
            obj.rarity === "rarity_uncommon"
          ) {
            rarity.uncommun += 1;
          }
          if (
            obj.price <= state.price.rare_price &&
            obj.rarity === "rarity_rare"
          ) {
            rarity.rare += 1;
          }
          if (
            obj.price <= state.price.legend_price &&
            obj.rarity === "rarity_legendary"
          ) {
            rarity.legend += 1;
          }
          if (
            obj.price <= state.price.mythical_price &&
            obj.rarity === "rarity_mythical"
          ) {
            rarity.mythical += 1;
          }
          if (
            obj.price <= state.price.immortal_price &&
            obj.rarity === "rarity_immortal"
          ) {
            rarity.immortal += 1;
          }
          return obj;
        }),
        rarity: rarity,
        isLoading: false,
      };

    case "FTHN_PRICE":
      return {
        ...state,
        fhtnPrice: payload,
      };
    case "SET_PRICE_CHECK":
      return {
        ...state,
        price: { ...payload },
      };

    default:
      return state;
  }
};

function toObject(arr) {
  var rv = {};
  for (let i = 0; i < arr.length; i++) {
    rv[i] = arr[i];
  }
  return rv;
}

export default rods;
