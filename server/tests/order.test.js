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

describe('PUT /orders', () => {
  it('should send 400 if meal doesnt exist', (done) => {
    chai.request(app)
      .put('/api/v1/orders/10')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        quantity: 3,
        total: 1000,
        deliveryAddress: 'EPIC Test',
        mealId: 10,
        userId: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Order not found');
        done();
      });
  });
  it('should return 200 for successful update', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Authorization', `Bearer ${caterer0Token}`)
      .send({
        quantity: 3,
        total: 1500,
        deliveryAddress: 'EPIC Towers Update',
        mealId: 2,
        userId: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('order modified successfully');
        expect(res.body.modifiedOrder).to.be.an('object');
        done();
      });
  });
});
