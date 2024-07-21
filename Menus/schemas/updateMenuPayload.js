const { productPriceUnits } = require("../../config");
const { menuCategory } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    category: {
      type: "string",
      enum: Object.values(menuCategory),
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(productPriceUnits),
    },
  },
  additionalProperties: false,
};
