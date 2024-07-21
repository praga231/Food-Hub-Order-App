const router = require("express").Router();

// Controller Imports
const CartItemsController = require("./controllers/CartItemsController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createCartItemsPayload = require("./schemas/createCartItemsPayload");
const updateCartItemsPayload = require("./schemas/updateCartItemsPayload");
const { roles } = require("../config");

router.get(
  "/",
  [
      isAuthenticatedMiddleware.check,
    ],
    CartItemsController.getAllCartItems
);

router.get(
  "/:cartItemId",
  [isAuthenticatedMiddleware.check],
    CartItemsController.getCartItemsById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(createCartItemsPayload),
  ],
    CartItemsController.addCartItem
);

router.patch(
  "/:cartItemId",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateCartItemsPayload),
  ],
    CartItemsController.updateCartItem
);

router.delete(
  "/:cartItemId",
  [isAuthenticatedMiddleware.check],
    CartItemsController.deleteCartItems
);

module.exports = router;
