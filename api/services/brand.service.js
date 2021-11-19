const Brand = require('../models/Brand');
const { createNewBrandValidation } = require('../schemas/category');
const { ERROR_CODE } = require('../utils/constants');
const { getDefaultValidationError } = require('../utils/utils');

const BrandService = () => {
  const getAll = async (req, res) => {
    try {
      const brands = await Brand.findAll();
      return res.status(200).json({ code: 'GET_SUCCESSFULLY', data: brands });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 'INTERNAL_ERROR', msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const { body } = req;
      const { error } = createNewBrandValidation(body);
      if (error) {
        return res.status(400).json({ code: ERROR_CODE.VALIDATION_ERROR, msg: getDefaultValidationError(error) });
      }

      const brandExisted = await Brand.findOne({
        where:
          {
            name: body.name,
          },
      });
      if (brandExisted) {
        return res.status(400).json({ code: 'BRAND_EXISTED', msg: 'Brand has been created' });
      }

      const newCategory = await Brand.create({
        name: body.name,
        description: body.description,
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
  };
};

module.exports = BrandService;
