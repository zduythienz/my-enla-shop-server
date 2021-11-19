const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Product = require('./Product');

const hooks = {
  // beforeCreate(user) {
  //   user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  // },
};

const tableName = 'brands';

const Brand = sequelize.define('Brand', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.STRING(1000),
  },
}, { hooks, tableName });

Brand.hasMany(Product);

// eslint-disable-next-line
Brand.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Brand;
