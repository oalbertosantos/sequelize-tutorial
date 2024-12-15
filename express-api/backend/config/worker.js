const { categoryQueue, productQueue } = require('./queue');

categoryQueue.process(async (job) => {
  console.log('Processando tarefa da fila para categorias: ', job.data);
  await categoryController.createCategory(job.data);
});

productQueue.process(async (job) => {
  console.log('Processando tarefa da fila para produtos: ', job.data);
  await productController.createProduct(job.data);
});
