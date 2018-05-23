import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Validate Sign Up', () => {
  it('should send error if fields are not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 4,
        username: ' ',
        email: 'slim.com',
        password: ' ',
        role: 'crer'
      })
      .end((error, res) => {
        expect(res.body.errors.username).to.equal('Enter a valid username');
        done();
      });
  });
  it('should send error if email is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 4,
        password: 'bgbdcvbc',
        role: 'caterer'
      })
      .end((error, res) => {
        expect(res.body.errors.message).to.equal('All fields are required');
        done();
      });
  });
  it('should send error if role is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 4,
        username: 'solo',
        email: 'slim@ymail.com',
        password: 'fcgncgnvn',
        role: ' '
      })
      .end((error, res) => {
        expect(res.body.errors.role).to.equal('You must choose between caterer or a customer');
        done();
      });
  });
});

describe('Validate Sign In', () => {
  it('should send error if email is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'email',
        password: 'bgbdcvbc'
      })
      .end((error, res) => {
        expect(res.body.errors.email).to.equal('Enter a valid email');
        done();
      });
  });
  it('should send error if password is empty ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'slim@ymail.com'
      })
      .end((error, res) => {
        expect(res.body.errors.password).to.equal('password cannot be empty');
        done();
      });
  });
  it('should send error if password is empty ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'slim@ymail.com',
        password: ' '
      })
      .end((error, res) => {
        expect(res.body.errors.password).to.equal('password must be at least 6 characters long');
        done();
      });
  });
});
