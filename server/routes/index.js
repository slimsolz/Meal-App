import express from 'express';
import UserController from '../controllers/userController';
import MealController from '../controllers/mealController';
import MenuController from '../controllers/menuController';
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

// 404 page
router.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
