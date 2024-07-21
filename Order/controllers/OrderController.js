const OrderModel = require("../../common/models/Order");
const CartModel = require("../../common/models/Cart");
const OrderItemsModel = require("../../common/models/OrderItems");

module.exports = {

  getAllOrders: (req, res) => {
    const { query: filters } = req;
    const  {user: user } = req;
    filters.userId = user.userId;
    OrderModel.findAllOrder(filters)
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

  getOrderById: (req, res) => {
    const {
      params: { orderId },
    } = req;
      const  {user: user } = req;
      const query = {};
      query.id = orderId;
      query.userId =  user.userId;
    OrderModel.findOrder(query)
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

  createOrder: (req, res) => {
    const { body } = req;
    const orderObj = {};
    const orderItemsObj = [];
    CartModel.findCartWithCartItems({cartId: body.cartId})
        .then((cart) => {
          const jsonString = JSON.stringify(cart);
          const obj = JSON.parse(jsonString);
          const formattedResult = [];
          obj.forEach(function(c){
            r = {};
            const orderItems = {};
            menuD = c['menuA'];
            cartD = c['cartA'];
            userD = cartD['user'];
            r.cartId = c['cartId'];
            r.menuId = c['menuId'];
              orderItems.menuId = c['menuId'];
            r.menuName = menuD['name'];
            r.price = menuD['price'];
            r.quantity =  c['quantity'];
              orderItems.quantity = c['quantity'];
            r.totalPrice = menuD['price'] * c['quantity'];
            r.username = userD['username'];
            r.userid = userD['id'];
            orderObj.userId =  userD['id'];
            orderObj.totalPrice = orderObj.totalPrice ? orderObj.totalPrice + c['quantity'] * menuD['price'] :  c['quantity'] * menuD['price'];
            formattedResult.push(r);
            orderItemsObj.push(orderItems);
          });


        OrderModel.createOrder(orderObj)
            .then((order) => {
                var result = order.toJSON();
                orderObj.orderId = res["id"];

                orderItemsObj.forEach(function(c){
                    c.orderId=result["id"];
                })
                console.log(orderItemsObj);
                OrderItemsModel.addOrderItems(orderItemsObj);
                CartModel.deleteCart({id: body.cartId});
                return res.status(200).json({
                    status: true,
                    data: order.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });


  },


  getOrderDetails: (req, res) => {
    const {
      params: { orderId },
    } = req;
    console.log(orderId);
    OrderModel.findOrderWithOrderItems({ orderId: orderId })
        .then((order) => {
          const jsonString = JSON.stringify(order);
          const obj = JSON.parse(jsonString);
          console.log(obj);
          const formattedResult = [];
          obj.forEach(function(c){
            r = {};
            menuD = c['menuAO'];
            orderD = c['orderA'];
            userD = orderD['user'];
            r.orderId = c['orderId'];
            r.menuId = c['menuId'];
            r.menuName = menuD['name'];
            r.price = menuD['price'];
            r.quantity =  c['quantity'];
            r.totalPrice = menuD['price'] * c['quantity'];
            r.username = userD['username'];
            r.userid = userD['id'];
            r.billingPrice = orderD['totalPrice'];
            formattedResult.push(r);
          });
          //
          // console.log(formattedResult);

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
