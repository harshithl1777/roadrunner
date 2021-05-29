const request = require('supertest');
const app = require('../../server');

test('Addition test', () => {
    expect(1+1).toBe(2);
});

test('Route test', async () => {
    const res = await request(app).get('/tests');
    expect(res.statusCode).toEqual(200);
});