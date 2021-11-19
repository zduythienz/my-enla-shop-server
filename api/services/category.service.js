const Category = require('../models/Category');
const { createNewCategoryValidation } = require('../schemas/category');
const { ERROR_CODE } = require('../utils/constants');
const { getDefaultValidationError } = require('../utils/utils');

const CategoryService = () => {
  const getAll = async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json({ code: 'GET_SUCCESSFULLY', data: categories });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  const getAllHierarchy = async (req, res) => {
    try {
      const categories = await Category.findAll({ hierarchy: true });
      return res.status(200).json({ code: 'GET_SUCCESSFULLY', data: categories });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const { body } = req;
      const { error } = createNewCategoryValidation(body);
      if (error) {
        return res.status(400).json({ code: ERROR_CODE.VALIDATION_ERROR, msg: getDefaultValidationError(error) });
      }

      const categoryExisted = await Category.findOne({
        where:
          {
            name: body.name,
          },
      });
      if (categoryExisted) {
        return res.status(400).json({ code: 'CATEGORY_EXISTED', msg: 'Category has been created' });
      }

      const newCategory = await Category.create({
        name: body.name,
        description: body.description,
        parentId: body.parentId,
      });

      return res.status(200).json({ code: 'CREATE_SUCCESSFULLY', data: newCategory });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    create,
    getAllHierarchy,
  };
};

module.exports = CategoryService;
