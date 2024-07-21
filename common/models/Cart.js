const { DataTypes, Deferrable } = require("sequelize");
const UserModel = require("../models/User");
const CartItems = require("../models/CartItems");
const Menu = require("../models/Menu");

const CartModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("cart", CartModel);
        return this.model;
    },

    createCart: (cart) => {
        console.log(cart);
        return this.model.create(cart);
    },

    findCart: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateCart: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllCart: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteCart: (query) => {
        return this.model.destroy({
            where: query
        });
    },

    getModel : () => {
        return this.model;
    },

    findCartWithCartItems : (query) => {
        console.log(query);
        return CartItems.getModel().findAll({
            where: query,
            include: [{ all: true, nested: true }
            ],
            required: false
        });
    }
}
