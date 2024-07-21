const MenuModel = require("../../common/models/Menu");

module.exports = {
  getAllMenus: (req, res) => {
    const { query: filters } = req;

    MenuModel.findAllMenu(filters)
      .then((menus) => {
        return res.status(200).json({
          status: true,
          data: menus,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getMenuById: (req, res) => {
    const {
      params: { menuId },
    } = req;

    MenuModel.findMenu({ id: menuId })
      .then((menu) => {
        return res.status(200).json({
          status: true,
          data: menu.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createMenu: (req, res) => {
    const { body } = req;

    MenuModel.createMenu(body)
      .then((menu) => {
        return res.status(200).json({
          status: true,
          data: menu.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateMenu: (req, res) => {
    const {
      params: { menuId },
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

    MenuModel.updateMenu({ id: menuId }, payload)
      .then(() => {
        return MenuModel.findMenu({ id: menuId });
      })
      .then((menu) => {
        return res.status(200).json({
          status: true,
          data: menu.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteMenu: (req, res) => {
    const {
      params: { menuId },
    } = req;

    MenuModel.deleteMenu({id: menuId})
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
