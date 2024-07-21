const { DataTypes, Deferrable } = require("sequelize");
const UserModel = require("../models/User");
const OrderItems = require("../models/OrderItems");
const Menu = require("../models/Menu");

const OrderModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("order", OrderModel);
        return this.model;
    },

    createOrder: (order) => {
        return this.model.create(order);
    },

    findOrder: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllOrder: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    getModel : () => {
        return this.model;
    },

    findOrderWithOrderItems : (query) => {
        console.log(query);
        return OrderItems.getModel().findAll({
            where: query,
            include: [{ all: true, nested: true }
            ],
            required: false
        });
    }
}
