const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
require('dotenv').config();

let token = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'test123'
  });
  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Expense APIs', () => {
  it('should create a new expense', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .field('amount', 150)
      .field('category', 'Food')
      .field('date', new Date().toISOString())
      .field('notes', 'Dinner');

    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(150);
  });
});
