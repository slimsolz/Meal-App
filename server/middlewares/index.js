import validator from 'validator';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';
import isInt from 'validator/lib/isInt';
import Model from '../models';

const { User } = Model;

export default class Middleware {

  static validateSignUp(req, res, next) {
    const errors = {};
    const {
      email, username, password, role
    } = req.body;

    if (!email || !username) {
      errors.message = 'All fields are required';
    }

    if (email && !validator.isEmail(email)) {
      errors.email = 'Invalid Email';
    }

    if (username && validator.isEmpty(username.trim())) {
      errors.username = 'Enter a valid username';
    }

    if (!password || (password && validator.isEmpty(password.trim()))) {
      errors.password = 'password cannot be empty';
    }

    if (password && password.length < 6) {
      errors.password = 'password must be at least 6 characters long';
    }

    if (role && (validator.isEmpty(role.trim()) || isInt(role))) {
      errors.role = 'You must choose between caterer or a customer';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors
    });
  }

  static validateSignIn(req, res, next) {
    const {
      email, password
    } = req.body;
    const errors = {};

    if (!email || (email && !validator.isEmail(email))) {
      errors.email = 'Enter a valid email';
    }

    if (!password || (password && validator.isEmpty(password.trim()))) {
      errors.password = 'password cannot be empty';
    }

    if (password && password.length < 6) {
      errors.password = 'password must be at least 6 characters long';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors
    });
  }

  static validateAddMeal(req, res, next) {
    const {
      name, price, imgPath
    } = req.body;
    const errors = {};

    if (!name || !isNaN(name) || (name && validator.isEmpty(name))) {
      errors.name = 'Enter a valid name';
    }

    if (!price || (price && isNaN(price))) {
      errors.price = 'Invalid Price';
    }

    if (!imgPath || !isNaN(imgPath) || (imgPath && validator.isEmpty(imgPath))) {
      errors.imgPath = 'Valid Image path is required';
    }

    if (isEmpty(errors)) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors
    });
  }


}
