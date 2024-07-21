const { DataTypes } = require("sequelize");
const { productPriceUnits } = require("../../config");
const { menuCategory } = require("../../config");

const MenuModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: menuCategory.Lunch,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: productPriceUnits.INR,
    },
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("menu", MenuModel)
        return this.model;
    },

    createMenu: (menu) => {
        return this.model.create(menu);
    },

    findMenu: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateMenu: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllMenu: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteMenu: (query) => {
        return this.model.destroy({
            where: query
        });
    }
}
