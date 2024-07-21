const {DataTypes} = require("sequelize");
module.exports = {
  type: "object",
  properties: {
    cartId: {
      type: "number",
    },
    menuId: {
      type: "number",
    },
    quantity: {
      type: "number",
    }

  },
  required: ["cartId", "menuId", "quantity"],
  additionalProperties: false,
};
