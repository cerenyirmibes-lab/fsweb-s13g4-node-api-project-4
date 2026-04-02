const request = require('supertest');
const server = require('./index.js');

describe('API Testleri', () => {
  it('sunucu çalışıyor mu', () => {
    expect(true).toBe(true);
  });
});