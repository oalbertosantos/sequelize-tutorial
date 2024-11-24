const mongoose = require('mongoose');

// Obtenha a URI do ambiente
const env = process.env.NODE_ENV || 'development';
const config = require('./config.mongo.json')[env];

// Conecte ao MongoDB
mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error.message);
});
