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

    User.find({ where: { email: email.trim().toLowerCase() } })
      .then((userExists) => {
        if (userExists) {
          return res.status(409).json({
            status: 'error',
            message: 'Account exists'
          });
        }
        return null;
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
        token,
        user: {
          username: user.username,
          email: user.email,
          role: user.role
        },
      });
    });
  }

  /* Sign in */
  static signIn(req, res) {
    const {
      email, password
    } = req.body;

    User.find({ where: { email: email.trim().toLowerCase() } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            status: 'error',
            message: 'Incorrect Email or password'
          });
        }
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
          return res.status(401).json({
            status: 'error',
            message: 'Incorrect Email or password'
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
        return res.set('Authorization', `Bearer ${token}`)
          .status(200).json({
            status: 'success',
            message: 'logged in',
            token,
            user: {
              username: user.username
            }
          });
      });
  }
}
