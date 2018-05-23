[![Build Status](https://travis-ci.org/slimsolz/Meal-App.svg?branch=develop)](https://travis-ci.org/slimsolz/Meal-App)
[![Coverage Status](https://coveralls.io/repos/github/slimsolz/Meal-App/badge.svg)](https://coveralls.io/github/slimsolz/Meal-App)
[![Maintainability](https://api.codeclimate.com/v1/badges/4978ee47683a6e8b6432/maintainability)](https://codeclimate.com/github/slimsolz/Meal-App/maintainability)

# Meal-App
Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat

### Features
- User Sign up: `POST api/v1/auth/signup`
- User Sign in: `POST api/v1/auth/signin`
- List all meals: `GET api/v1/meals/:id`
- Add new meal: `POST api/v1/meals`
- Update a meal: `PUT api/v1/meals/:id`
- Delete a meal: `DELETE api/v1/meals/:id`
- Set menu for the day: `POST api/v1/menu`
- Get menu for the day: `GET api/v1/menu`
- Place an Order: `POST api/v1/orders`
- Modify an Order: `PUT api/v1/orders/:id`
- Get orders: `GET api/v1/orders` 

#### Dependencies
- Express JS: Web application framework for Node.js.
- Body-Parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property

#### Dev Dependencies
- Coveralls: Helps to show which part code is not covered by test suite
- Eslint: Linting utility for JavaScript and JSX
- Babel: The compiler for writing next generation JavaScript.
- Mocha & Chai: Testing the Web Application
- Chai: TDD assertion library for node
- Nodemon: Utility that will monitor for any changes in your source and automatically restart your server.

### How To Contribute
- Fork the project & clone locally.
- Branch for each separate piece of work `$ git checkout -b <branch-name>`
- Do the work, write good commit messages.
- Push to your origin repository.
- Create a new PR in GitHub.
- Wait for approval.

#### Author
[Odumah Solomon](https://twitter.com/slimsolz)
