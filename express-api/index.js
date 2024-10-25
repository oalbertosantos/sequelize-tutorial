const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// App para ser usado nos testes
module.exports = app;

