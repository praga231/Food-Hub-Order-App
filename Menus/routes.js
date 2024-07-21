const router = require("express").Router();

// Controller Imports
const MenuController = require("./controllers/MenuController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createProductPayload = require("./schemas/createMenuPayload");
const updateProductPayload = require("./schemas/updateMenuPayload");
const { roles } = require("../config");

router.get(
    "/",
    [isAuthenticatedMiddleware.check],
    MenuController.getAllMenus
);

router.get(
    "/:menuId",
    [isAuthenticatedMiddleware.check],
    MenuController.getMenuById
);

router.post(
    "/",
    [
        isAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(createProductPayload),
    ],
    MenuController.createMenu
);

router.patch(
    "/:menuId",
    [
        isAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(updateProductPayload),
    ],
    MenuController.updateMenu
);

router.delete(
    "/:menuId",
    [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
    MenuController.deleteMenu
);

module.exports = router;
