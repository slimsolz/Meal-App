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

describe('POST /orders', () => {
  it('should send 201 and post an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        quantity: 2,
        total: 700,
        deliveryAddress: 'EPIC Towers Test',
        mealId: 2,
        userId: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Order placed');
        done();
      });
  });
  it('should send 500 and not post an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        quantity: 2,
        total: 700,
        deliveryAddress: 'EPIC Towers Test',
        mealId: 0,
        userId: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Something went wrong');
        done();
      });
  });
});
