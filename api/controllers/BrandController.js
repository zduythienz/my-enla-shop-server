const brandService = require('../services/brand.service');

const BrandController = () => {
  const getAll = async (req, res) => {
    try {
      return brandService().getAll(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      return brandService().create(req, res);
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

module.exports = BrandController;
