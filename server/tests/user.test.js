import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
  id: 1,
  email: 'user1@gmail.com',
  username: 'user1',
  password: 'user1password',
  role: 'caterer'
};

const Customer = {
  id: 2,
  email: 'user1@gmail.com',
  username: 'user2',
  password: 'user2password',
  role: 'customer'
};

let catererToken;

describe('Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(Caterer)
      .end((err, res) => {
        catererToken = res.body.token;
        done();
      });
  });
});

describe('POST /auth/signup', () => {
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', `Bearer ${catererToken}`)
      .send(Caterer)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('User created and logged in');
        done();
      });
  });
  it('should return 409 if email exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 3,
        email: 'user1@gmail.com',
        username: 'slim',
        password: 'slimpass',
        role: 'caterer'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('Account exists');
        done();
      });
  });
});

