const Queue = require('bull');
const categoryController = require('../controllers/category');
const productController = require('../controllers/product');

// Instância da fila com o Redis (substitua as configurações pelo seu ambiente)
const queue = new Queue('jobs', {
  redis: { host: '127.0.0.1', port: 6379 },
});

// Processar jobs para criação de categorias
queue.process('createCategory', async (job) => {
  try {
    await categoryController.createCategory(job.data);
    console.log('Categoria criada:', job.data);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
  }
});

// Processar jobs para atualização de categorias
queue.process('updateCategory', async (job) => {
  try {
    const { id, data } = job.data;
    await categoryController.updateCategory(id, data);
    console.log('Categoria atualizada:', id, data);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
  }
});

// Processar jobs para criação de produtos
queue.process('createProduct', async (job) => {
  try {
    await productController.createProduct(job.data);
    console.log('Produto criado:', job.data);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
  }
});

module.exports = queue;
