const categoryService = require('../services/category.service');

const CategoryController = () => {
  const getAll = async (req, res) => {
    try {
      const { hierarchy } = req.body;
      if (hierarchy) {
        return categoryService().getAllHierarchy(req, res);
      }
      return categoryService().getAll(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      return categoryService().create(req, res);
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

module.exports = CategoryController;
