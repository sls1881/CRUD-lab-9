const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');


describe('CRUD-lab-9 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  let dog;
  beforeEach(async () => {
    dog = await Dog.insert({
      dogName: 'Chloe',
      age: 4,
      foodAllergies: 'none', 
      breed: 'Chihuahua',
      ownerName: 'Shelby'
    })
  });

  it('should post a new dog', async() => {
    const res = await request(app)
    .post('/api/v1/dogs')
    .send(dog);

    expect(res.body).toEqual({
      id: '2',
      dogName: 'Chloe',
      age: 4,
      foodAllergies: 'none', 
      breed: 'Chihuahua',
      ownerName: 'Shelby'
    });
  })

  it('should get all dogs', async() => {
    const res = await request(app)
    .get('/api/v1/dogs')
    expect(res.body).toEqual([dog]);
  })

  it('should get a dog by ID', async() => {
    const res = await request(app)
    .get(`/api/v1/dogs/${dog.id}`)
    expect(res.body).toEqual(dog);
  })

  it('should update a dog', async() => {

    const updatedDog = {
      id: '1',
      dogName: 'Chloe',
      age: 5,
      foodAllergies: 'none', 
      breed: 'Chihuahua',
      ownerName: 'Shelby'
    }

    const res = await request(app)
    .put(`/api/v1/dogs/${dog.id}`)
    .send(updatedDog)
    
    expect(res.body).toEqual(updatedDog);
  })

  it('should delete a dog', async() => {

    const res = await request(app)
    .delete(`/api/v1/dogs/${dog.id}`)
   
    expect(res.body).toEqual(dog);
  })
});
