import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Meal = {
  id: 1,
  name: 'Beans Test',
  price: 350,
  imgPath: 'images/beansTest.png'
};

const Caterer = {
  email: 'usermeal@gmail.com',
  username: 'user9',
  password: 'user9password',
  role: 'caterer'
};

const Customer = {
  email: 'umeal@gmail.com',
  username: 'user0',
  password: 'user0password',
  role: 'customer'
};

let catererToken;
let customertoken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(Caterer)
    .end((err, res) => {
      catererToken = res.body.token;
      done();
    });
});

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(Customer)
    .end((err, res) => {
      customertoken = res.body.token;
      done();
    });
});

describe('Validate Sign Up', () => {
  it('should send error if email is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 4,
        password: 'sl',
        role: 'caterer'
      })
      .end((error, res) => {
        expect(res.body.errors.password).to.equal('password must be at least 6 characters long');
        done();
      });
  });
  it('should send error if role is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors).to.be.an('object');
        done();
      });
  });
});

describe('Validate Sign In', () => {
  it('should send error if email is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        password: 'sl',
        role: 'caterer'
      })
      .end((error, res) => {
        expect(res.body.errors.password).to.equal('password must be at least 6 characters long');
        done();
      });
  });
  it('should send error if password is empty ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors).to.be.an('object');
        done();
      });
  });
});

describe('Validate Add Meals', () => {
  it('should send an error if error occurs', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors).to.be.an('object');
        done();
      });
  });
});

// LoggedIn Middleware
describe('POST /meals', () => {
  it('should return 401, User not logged in', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3MTM3NjQ2LCJleHAiOjE1MjcyMjQwNDZ9.0J2YZ8LAUpEnauDvl21U2OjHIQjRBzR70PlLVvNPD9o')
      .send(Meal)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return 401, User is not caterer', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${customertoken}`)
      .send(Meal)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

// validParam Middleware
describe('Validate params', () => {
  it('should return 400', (done) => {
    chai.request(app)
      .put('/api/v1/meals/xxx')
      .set('Authorization', `Bearer ${customertoken}`)
      .send({
        name: 'Beans Update',
        price: 500,
        imgPath: 'beansUpdate/test.png'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid params');
        done();
      });
  });
}); 
