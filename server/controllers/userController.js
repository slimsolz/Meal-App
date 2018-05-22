import { isEmail } from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Model from '../models';

require('dotenv').config();

const { User } = Model;

export default class UserController {
  static signUp(req, res) {
    const {
      email, username, password, role
    } = req.body;

    if (!email || !username || !password) {
      res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    User.find({ where: { email: email.trim().toLowerCase() } })
      .then((userExists) => {
        if (userExists) {
          return res.status(409).json({
            status: 'error',
            message: 'Account exists'
          });
        }
      });

    const hash = bcrypt.hashSync(password, 10);
    User.create({
      email: email.trim().toLowerCase(),
      username,
      password: hash,
      role
    }).then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
      return res.status(201).json({
        status: 'success',
        message: 'User created and logged in',
        user: {
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      });
    });
  }
}
