const router = require("express").Router();

// Controller Imports
const CartController = require("./controllers/CartController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createCartPayload = require("./schemas/createCartPayload");
const updateCartPayload = require("./schemas/updateCartPayload");
const { roles } = require("../config");

router.get(
  "/",
  [
      isAuthenticatedMiddleware.check,
    ],
    CartController.getAllCarts
);

router.get(
  "/:cartId",
  [isAuthenticatedMiddleware.check],
    CartController.getCartById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    //SchemaValidationMiddleware.verify(createCartPayload),
  ],
    CartController.createCart
);

router.get(
    "/:cartId/checkout",
    [
        isAuthenticatedMiddleware.check
    ],
    CartController.checkout
);

router.patch(
  "/:cartId",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateCartPayload),
  ],
    CartController.updateCart
);

router.delete(
  "/:cartId",
  [isAuthenticatedMiddleware.check],
    CartController.deleteCart
);

module.exports = router;
