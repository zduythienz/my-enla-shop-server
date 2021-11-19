const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {
  // beforeCreate(user) {
  //   user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  // },
};

const tableName = 'categories';

const Category = sequelize.define('Category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.STRING(1000),
  },
  parentId: {
    type: Sequelize.INTEGER,
    hierarchy: true,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Category.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Category;
