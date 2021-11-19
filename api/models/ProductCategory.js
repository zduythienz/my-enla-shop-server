const sequelize = require('../../config/database');
const Category = require('./Category');
const Product = require('./Product');

const tableName = 'product_category';

const ProductCategory = sequelize.define('ProductCategory', {

}, {
  timestamps: false,
  tableName,
});

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

module.exports = ProductCategory;
