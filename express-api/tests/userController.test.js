const request = require('supertest');
const app = require('../index'); // O caminho 
const { User, sequelize } = require('../models');

let userId; // Declare userId no escopo do arquivo

beforeAll(async () => {
  // Limpa a tabela antes dos testes
  await User.destroy({ where: {}, truncate: true });
});

describe('User Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Carlos',
        email: 'carlos@example.com',
      });

    userId = response.body.id; // Armazena o ID do usuário criado
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Carlos');
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1); // Verifica se um usuário foi criado
  });

  it('should retrieve a user by ID', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Carlos');
  });

  it('should update a user by ID', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        name: 'Alberto',
        email: 'alberto@example.com',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Alberto');
  });

  it('should delete a user by ID', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User deleted successfully.');

    // Tentar buscar o usuário para garantir que ele foi realmente deletado
    const user = await User.findByPk(userId);
    expect(user).toBeNull(); // O usuário deve ser nulo
  });
});

