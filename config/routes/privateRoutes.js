const privateRoutes = {
  'GET /users': 'UserController.getAll',

  'POST /category/create': 'CategoryController.create',

  'POST /product/create': 'ProductController.create',

};

module.exports = privateRoutes;
