import express from 'express';
import UserController from '../controllers/userController';
import MealController from '../controllers/mealController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/orderController';
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

// Meal
router.post('/meals', Middleware.isLoggedIn, Middleware.checkRole, Middleware.validateAddMeal, MealController.addMeal);
router.put('/meals/:id', Middleware.isLoggedIn, Middleware.validateParams, Middleware.checkRole, Middleware.validateAddMeal, MealController.updateMeal);
router.delete('/meals/:id', Middleware.isLoggedIn, Middleware.validateParams, Middleware.checkRole, MealController.deleteMeal);
router.get('/meals', Middleware.isLoggedIn, Middleware.checkRole, MealController.getMeals);

// Menu
router.post('/menu', Middleware.isLoggedIn, Middleware.checkRole, MenuController.setMenu);
router.get('/menu', Middleware.isLoggedIn, MenuController.getMenu);

// Order
router.post('/orders', Middleware.isLoggedIn, OrderController.placeOrder);
router.put('/orders/:id', Middleware.isLoggedIn, Middleware.validateParams, OrderController.modifyOrder);
router.get('/orders', Middleware.isLoggedIn, Middleware.checkRole, OrderController.getAvailableOrder);

// 404 page
router.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

router.put('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

router.post('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
