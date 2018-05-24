import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
  email: 'user2@gmail.com',
  username: 'user2',
  password: 'user2password',
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

const Meal = {
  id: 1,
  name: 'Beans Test',
  price: 350,
  imgPath: 'images/beansTest.png'
};


describe('POST /meals', () => {
  it('should add a new meal', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${catererToken}`)
      .send(Meal)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Meal added');
        done();
      });
  });
  it('should return 409 as meal already exists', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({
        id: 2,
        name: 'Beans Test',
        price: 250,
        imgPath: 'images/test.png'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('Meal already exists');
        done();
      });
  });
});
