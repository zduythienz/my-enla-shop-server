const Product = require('../models/Product');
require('../models/ProductCategory');

const { createNewProductValidation } = require('../schemas/product');
const { ERROR_CODE } = require('../utils/constants');
const { getDefaultValidationError, isArrayNumber } = require('../utils/utils');

const ProductService = () => {
  const getAll = async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({ code: 'GET_SUCCESSFULLY', data: products });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const { body } = req;
      const { error } = createNewProductValidation(body);
      if (error) {
        return res.status(400).json({ code: ERROR_CODE.VALIDATION_ERROR, msg: getDefaultValidationError(error) });
      }

      const productExisted = await Product.findOne({
        where:
          {
            name: body.name,
          },
      });
      if (productExisted) {
        return res.status(400).json({ code: 'PRODUCT_EXISTED', msg: 'Product has been created' });
      }

      const newProduct = await Product.create({
        ...body,
      });

      const { categories } = body;

      if (isArrayNumber(categories)) {
        newProduct.addCategory([categories]);
      }


      // newProduct.addCategory(newProduct.id, 3);

      return res.status(200).json({ code: 'CREATE_SUCCESSFULLY', data: newProduct });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    create,
    // getAllHierarchy,
  };
};

module.exports = ProductService;
