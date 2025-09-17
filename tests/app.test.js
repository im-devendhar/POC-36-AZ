const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with hello', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Hello from Azure App Service/);
  });
});
