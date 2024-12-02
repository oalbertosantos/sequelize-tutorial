// Disable dotenv in a production env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');

// Routes import
const routes = require('./routes')

// Initialize express
const app = express()

// Port if PORT env variable does not exist in .env
const port = process.env.PORT || 3335

// CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permitir envio de cookies/tokens
};


// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(helmet())
app.use(cookieParser());

// Routes middleware
app.use('/api', routes)

// Port listener
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})