const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',

  'POST /get-categories': 'CategoryController.getAll',

  'POST /product/get-all': 'ProductController.getAll',

  'POST /brand/get-all': 'BrandController.getAll',

};

module.exports = publicRoutes;
