const router = require('express').Router();
const cache = require('../config/cache');

// Importação de controllers
const { categoryController, productController, authController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operações relacionadas a categorias
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Obtém todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       401:
 *         description: Não autorizado.
 */
router.get('/v1/categories', authMiddleware, categoryController.getAllCategories);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/v1/categories', authMiddleware, categoryController.createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Obtém uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */
router.get('/v1/categories/:id', authMiddleware, categoryController.getCategoryById);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */
router.put('/v1/categories/:id', authMiddleware, categoryController.updateCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Remove uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 */
router.delete('/v1/categories/:id', authMiddleware, categoryController.deleteCategory);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operações relacionadas a produtos
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtém todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *       401:
 *         description: Não autorizado.
 */
router.get('/v1/products', authMiddleware, productController.getAllProducts);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               inStock:
 *                 type: boolean
 *               productImage:
 *                 type: string
 *               price:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/v1/products', authMiddleware, productController.createProduct);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações de autenticação
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/v1/auth/login', authController.login);

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/v1/auth/signup', authController.signup);

module.exports = router;
