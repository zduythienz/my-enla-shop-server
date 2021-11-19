const User = require('../models/User');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');

const UserController = () => {
  const register = async (req, res) => {
    try {
      return userService().register(req, res);
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const login = async (req, res) => {
    try {
      return userService().login(req, res);
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    register,
    login,
    validate,
    getAll,
  };
};

module.exports = UserController;
