/* eslint-disable */
const { expect } = require('chai');

const APITester = require('../../api-tester');
const server = require('../../../dist').default;

describe('emotes', function() {
    this.slow(1000);
    this.timeout(5000);

    const apiTester = new APITester(server);

    after(() => server.close());

    describe('GET /misc/8ball', () => {
        it('should return 200', async () => {
            await apiTester.get('/api/v1/misc/8ball', 200);
        });
    });

    describe('GET /misc/coinflip', () => {
        it('should return 200', async () => {
            await apiTester.get('/api/v1/misc/coinflip', 200);
        });
    });
});
