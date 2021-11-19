const Joi = require('joi');

const createNewCategoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    parentId: Joi.number(),
  });
  return schema.validate(body, { allowUnknown: true });
};


module.exports = {
  createNewCategoryValidation,
};
