const request = require('supertest');
const { app, server } = require('../../server');

test('Addition test', () => {
    expect(1+1).toBe(2);
});

test('Route test', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    server.close();
});