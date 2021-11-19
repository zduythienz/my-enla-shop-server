const User = require('../models/User');
const { Op } = require('sequelize');
const { registerValidation } = require('../schemas/user');
const { ERROR_CODE } = require('../utils/constants');
const { getDefaultValidationError } = require('../utils/utils');

const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserService = () => {
  const register = async (req, res) => {
    try {
      const { body } = req;
      const { error } = registerValidation(body);
      if (error) {
        return res.status(400).json({ code: ERROR_CODE.VALIDATION_ERROR, msg: getDefaultValidationError(error) });
      }
      const userExisted = await User.findOne({
        where:
          {
            [Op.or]: [{ email: body.email }, { phone: body.phone }],
          },
      });
      if (userExisted) {
        return res.status(500).json({ code: 'USER_EXISTED', msg: 'User has been register' });
      }
      await User.create({
        email: body.email,
        password: body.password,
        phone: body.phone,
      });
      const { password, confirmPassword, ...restprops } = body;
      return res.status(200).json({ code: 'REGISTER_SUCCESSFULLY', data: restprops });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User
          .findOne({
            where: {
              email,
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  return {
    register,
    login,
  };
};

module.exports = UserService;
