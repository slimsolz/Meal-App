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
  it('should Successfully get all meals', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${catererToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Meals Available');
        done();
      });
  });
});
describe('PUT /meals', () => {
  it('should send 400 if meal doesnt exist', (done) => {
    chai.request(app)
      .put('/api/v1/meals/10')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({
        name: 'update',
        price: 380,
        imgPath: 'update.png'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Meal not found');
        done();
      });
  });
  it('should return 200 for successful update', (done) => {
    chai.request(app)
      .put('/api/v1/meals/1')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({
        name: 'Beans Update',
        price: 500,
        imgPath: 'beansUpdate/test.png'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Meal updated Successfully');
        done();
      });
  });
});
describe('DELETE /meals', () => {
  it('should send 400 if meal doesnt exist', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/10')
      .set('Authorization', `Bearer ${catererToken}`)
      .send({
        name: 'update',
        price: 380,
        imgPath: 'update.png'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Meal not found');
        done();
      });
  });
  it('should return 200 for successful update', (done) => {
    chai.request(app)
      .delete('/api/v1/meals/1')
      .set('Authorization', `Bearer ${catererToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Meal Deleted Successfully');
        done();
      });
  });
});
describe('GET /meals', () => {
  it('should return 400 as meal already exists', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${catererToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('No meal available');
        done();
      });
  });
});
