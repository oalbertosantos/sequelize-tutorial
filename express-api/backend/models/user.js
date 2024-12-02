'use strict';
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Importa o uuid para gerar ids únicos

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Defina as associações aqui, se necessário
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID, // Tipo UUID para o ID
        defaultValue: uuidv4,  // Gera um id único automaticamente
        primaryKey: true,      // Define o id como chave primária
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,          // Garante que o username seja único
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,      // A senha é obrigatória
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', // Especificando o nome correto da tabela no banco de dados
    }
  );

  return User;
};
