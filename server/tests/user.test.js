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

describe('POST /auth/signin', () => {
  it('should successfully log in a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'user1@gmail.com',
        password: 'user1password'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('logged in');
        expect(res.body.user.username).to.equal('user1');
        done();
      });
  });
  it('should return 401 for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'user9@gmail.com',
        password: 'user1password'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Incorrect Email or password');
        done();
      });
  });
  it('should return 401 for wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'user1@gmail.com',
        password: 'user9pass'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Incorrect Email or password');
        done();
      });
  });
});

