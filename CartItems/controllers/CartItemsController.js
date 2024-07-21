const CartItemsModel = require("../../common/models/CartItems");

module.exports = {
  getAllCartItems: (req, res) => {
    const { query: filters } = req;

    CartItemsModel.findAllCartItems(filters)
      .then((products) => {
        return res.status(200).json({
          status: true,
          data: products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getCartItemsById: (req, res) => {
    const {
      params: { cartItemId },
    } = req;

    console.log(cartItemId);

    CartItemsModel.findCartItems({ cartId: cartItemId })
      .then((cart) => {
        return res.status(200).json({
          status: true,
          data: cart.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  addCartItem: (req, res) => {
    const { body } = req;
    console.log(body);

    CartItemsModel.addCartItems(body)
      .then((cart) => {
        return res.status(200).json({
          status: true,
          data: cart.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateCartItem: (req, res) => {
    const {
      params: { cartItemId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the product.",
        },
      });
    }

    CartItemsModel.updateCartItems({ id: cartItemId }, payload)
      .then(() => {
        return CartItemsModel.findCartItems({ id: cartItemId });
      })
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteCartItems: (req, res) => {
    const {
      params: { cartItemId },
    } = req;

    CartItemsModel.deleteCartItems({id: cartItemId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfProductsDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
