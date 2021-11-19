const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const { PRODUCT_STATUS } = require('../utils/constants');

// const ProductCategory = require('./ProductCategory');

const hooks = {
  // beforeCreate(user) {
  //   user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  // },
};

const tableName = 'products';

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(9999),
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: PRODUCT_STATUS.DRAFT,
  },
  skus: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });



// eslint-disable-next-line
Product.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Product;
