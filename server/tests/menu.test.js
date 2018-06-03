import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
  email: 'user2@gmail.com',
  password: 'user2password',
};

let caterer0Token;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(Caterer)
    .end((err, res) => {
      caterer0Token = res.body.token;
      done();
    });
});

describe('POST /menu', () => {
  it('should add a new meal', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        name: 'Rice Test',
        price: 300,
        imgPath: 'images/riceTest.png'
      })
      .end((err, res) => {
        done();
      });
  });
  it('should add a new menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        ids: [2]
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Menu set for the day');
        done();
      });
  });
  it('should send 500 and not add a new menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        ids: [5]
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Something went wrong');
        done();
      });
  });
});

describe('GET /menu', () => {
  it('should get the menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
