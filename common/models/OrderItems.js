const { DataTypes, Deferrable } = require("sequelize");
const {UserModel} = require("../models/User")

const OrderItemsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    orderId: {
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
        this.model = sequelize.define("orderitems", OrderItemsModel);
        return this.model;
    },

    addOrderItems: (orderitems) => {
        return this.model.bulkCreate(orderitems);
        //return this.model.create(orderitems);
    },


    findAllOrderItems: (query) => {
        return this.model.findAll({
            where: query
        });
    },


    getModel: () => {
        return this.model;
    },
}
