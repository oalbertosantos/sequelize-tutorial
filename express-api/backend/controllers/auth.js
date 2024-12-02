const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser'); // Importa o cookie-parser

const signup = [
  body('username').notEmpty().withMessage('Username é obrigatório'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  async (req, res) => {
    const errors = validationResult(req); // Verifica se houve erro na validação
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Retorna erros de validação, se houver
    }

    const { username, password } = req.body;

    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Criptografando a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criando o novo usuário
      const user = await User.create({ username, password: hashedPassword });

      // Gerando o token JWT
      const token = jwt.sign(
        { 
          id: user.id 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.status(201).json({ token }); // Retorna o token ao usuário
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

const login = [
  body('username').notEmpty().withMessage('Username é obrigatório'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { 
          id: user.id
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN } // TTL do token
      );

       // Envia o token como um cookie
       res.cookie('token', token, {
        httpOnly: true, // O cookie não pode ser acessado via JavaScript
        secure: false, // Só envia o cookie em HTTPS
        maxAge: 24 * 60 * 60 * 1000, // O cookie expira após 24 horas
        sameSite: 'strict', // Adiciona uma política de segurança
      });

      // Não precisamos enviar o token no corpo da resposta, pois ele já foi enviado como cookie
      return res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

const logout = (req, res) => {
  // Limpa o cookie ao fazer logout
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

module.exports = {
  signup,
  login,
  logout,
};