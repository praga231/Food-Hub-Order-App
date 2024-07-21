const CartModel = require("../../common/models/Cart");
const CartItemsModel = require("../../common/models/CartItems");
const {query} = require("express");

module.exports = {
  getAllCarts: (req, res) => {
    const { query: filters } = req;
    const  {user: user } = req;

    filters.userId = user.userId;
    CartModel.findAllCart(filters)
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

  getCartById: (req, res) => {
    const {
      params: { cartId },
    } = req;
    const  {user: user } = req;
    const query = {};
    query.id = cartId;
    query.userId =  user.userId;
    CartModel.findCart(query)
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

  createCart: (req, res) => {
    const { body } = req;
    const  {user: user } = req;
    console.log(body);
    const query = {};
    query.userId =  user.userId;
    CartModel.createCart(query)
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

  updateCart: (req, res) => {
    const {
      params: { cartId },
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

    CartModel.updateCart({ id: cartId }, payload)
      .then(() => {
        return CartModel.findCart({ id: cartId });
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

  deleteCart: (req, res) => {
    const {
      params: { cartId },
    } = req;
    const  {user: user } = req;
    const query = {};
    query.id = cartId;
    query.userId =  user.userId;
    CartModel.deleteCart(query)
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

  checkout: (req, res) => {
    const {
      params: { cartId },
    } = req;
    const  {user: user } = req;

    CartModel.findCartWithCartItems({ cartId: cartId })
        .then((cart) => {
          var jsonString = JSON.stringify(cart); //convert to string to remove the sequelize specific meta data
          var obj = JSON.parse(jsonString); //to make plain json
          var formattedResult = [];
          obj.forEach(function(c){
            r = {};
            menuD = c['menuA'];
            cartD = c['cartA'];
            userD = cartD['user'];
            r.cartId = c['cartId'];
            r.menuId = c['menuId'];
            r.menuName = menuD['name'];
            r.price = menuD['price'];
            r.quantity =  c['quantity'];
            r.totalPrice = menuD['price'] * c['quantity'];
            r.username = userD['username'];
            r.userid = userD['id'];
            formattedResult.push(r);
          });

          console.log(formattedResult);

          return res.status(200).json({
            status: true,
            data: formattedResult
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
