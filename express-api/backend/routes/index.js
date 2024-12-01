const router = require('express').Router();

// Controller imports
const { categoryController, productController, authController } = require('../controllers');
const authMiddleware = require('../middlewares/auth'); // Importando o middleware de autenticação

// Category routes
router.get('/v1/categories', authMiddleware, categoryController.getAllCategories);
router.post('/v1/categories', authMiddleware, categoryController.createCategory);
router.get('/v1/categories/:id', authMiddleware, categoryController.getCategoryById);
router.put('/v1/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/v1/categories/:id', authMiddleware, categoryController.deleteCategory);

// Product routes
router.get('/v1/products', authMiddleware, productController.getAllProducts);
router.post('/v1/products', authMiddleware, productController.createProduct);
router.get('/v1/products/:id', authMiddleware, productController.getProductById);
router.put('/v1/products/:id', authMiddleware, productController.updateProductById);
router.delete('/v1/products/:id', authMiddleware, productController.deleteProductById);

// Auth routes
router.post('/v1/auth/login', authController.login);
router.post('/v1/auth/signup', authController.signup);

module.exports = router;