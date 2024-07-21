const router = require("express").Router();

// Controller Imports
const OrderController = require("./controllers/OrderController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createOrderPayload = require("./schemas/createOrderPayload");
const { roles } = require("../config");

router.get(
  "/",
  [
      isAuthenticatedMiddleware.check,
    ],
    OrderController.getAllOrders
);

router.get(
  "/:orderId",
  [isAuthenticatedMiddleware.check],
    OrderController.getOrderById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(createOrderPayload),
  ],
    OrderController.createOrder
);

router.get(
    "/:orderId/getOrderDetails",
    [
        isAuthenticatedMiddleware.check
    ],
    OrderController.getOrderDetails
);


module.exports = router;
