const { DataTypes, Deferrable } = require("sequelize");
const {UserModel} = require("../models/User")

const CartItemsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("cartitems", CartItemsModel);
        return this.model;
    },

    addCartItems: (cartitems) => {
        console.log(cartitems);
        return this.model.create(cartitems);
    },

    findCartItems: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateCartItems: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllCartItems: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteCartItems: (query) => {
        return this.model.destroy({
            where: query
        });
    },

    getModel: () => {
        return this.model;
    },
}
