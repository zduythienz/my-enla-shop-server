const productService = require('../services/product.service');

const ProductController = () => {
  const getAll = async (req, res) => {
    try {
      return productService().getAll(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      return productService().create(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    create,
  };
};

module.exports = ProductController;
