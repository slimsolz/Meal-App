import express from 'express';
import UserController from '../controllers/userController';
import Middleware from '../middlewares';

const router = express.Router();

// homepage
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to book-a-meal app'
  });
});

// User
router.post('/auth/signup', Middleware.validateSignUp, UserController.signUp);
router.post('/auth/signin', Middleware.validateSignIn, UserController.signIn);

// 404 page
router.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
