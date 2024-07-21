module.exports = {
  type: "object",
  properties: {
    userId: {
      type: "number",
    },
    cartId: {
      type: "number",
    }
  },
  required: ["cartId"],
  additionalProperties: false,
};
