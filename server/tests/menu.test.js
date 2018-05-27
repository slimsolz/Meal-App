import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
  email: 'user0@gmail.com',
  username: 'user0',
  password: 'user0password',
  role: 'caterer'
};

let catererToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(Caterer)
    .end((err, res) => {
      catererToken = res.body.token;
      done();
    });
});

describe('POST /menu', () => {
  it('should return 500 and Error message', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({
        ids: '1, 2'
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Something went wrong');
        done();
      });
  });
  it('should return 201 and a successful message', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${catererToken}`)
      .send([2])
      .end((err, res) => {
        expect(res.body.message).to.equal('Menu set for the day');
        done();
      });
  });
});
