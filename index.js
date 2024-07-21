const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");
const MenuRoutes = require("./Menus/routes");
const CartRoutes = require("./Cart/routes");
const CartItemsRoutes = require("./CartItems/routes");
const OrderRoutes = require("./Order/routes");
const OrderItemsRoutes = require("./OrderItems/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");
const MenuModel = require("./common/models/Menu");
const CartModel = require("./common/models/Cart");
const CartItemsModel = require("./common/models/CartItems");
const OrderModel = require("./common/models/Order");
const OrderItemsModel = require("./common/models/OrderItems");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
});

// Initialising the Model on sequelize
const User = UserModel.initialise(sequelize);
const Menu = MenuModel.initialise(sequelize);
const Cart = CartModel.initialise(sequelize);
const CartItems = CartItemsModel.initialise(sequelize);
const Order = OrderModel.initialise(sequelize);
const OrderItems = OrderItemsModel.initialise(sequelize);

User.hasMany(Cart);
Cart.belongsTo(User);
Cart.hasMany(CartItems);
Menu.hasMany(CartItems);
CartItems.belongsTo(Cart, {
    as: 'cartA',
    foreignKey: "cartId"
});
CartItems.belongsTo(Menu, {
    as: 'menuA',
    foreignKey: "menuId"
});
Order.belongsTo(User);
Order.hasMany(OrderItems);
OrderItems.belongsTo(Order, {
    as: 'orderA',
    foreignKey: "orderId"
})
OrderItems.belongsTo(Menu, {
    as: 'menuAO',
    foreignKey: "menuId"
})


// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);
    app.use("/menu", MenuRoutes);
    app.use("/cart", CartRoutes);
    app.use("/cartitems", CartItemsRoutes);
    app.use("/order", OrderRoutes);
    app.use("/orderitems", OrderItemsRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
