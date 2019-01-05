const { expect } = require('chai');

const APITester = require('../../api-tester');
const server = require('../../../dist').default;

describe('emotes', function() {
    this.slow(1000);
    this.timeout(5000);

    const apiTester = new APITester(server);

    after(() => server.close());

    describe('GET /:channel/bttv', () => {
        it('should return 200 for a valid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/night/bttv', 200);
            expect(res.text).to.not.equal('Channel not found');
        });

        it('should return 404 for invalid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/_invalidChannelName/bttv', 404);
            expect(res.text).to.equal('Channel not found');
        });
    });

    describe('GET /:channel/ffz', () => {
        it('should return 200 for a valid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/sirstendec/ffz', 200);
            expect(res.text).to.not.equal('Channel not found');
        });

        it('should return 404 for invalid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/_invalidChannelName/ffz', 404);
            expect(res.text).to.equal('Channel not found');
        });
    });

    describe('GET /:channel/twitch', () => {
        it('should return 200 for a valid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/lirik/twitch', 200);
            expect(res.text).to.not.equal('Channel not found');
        });

        it('should return 404 for invalid channel', async () => {
            const res = await apiTester.get('/api/v1/emotes/_invalidChannelName/twitch', 404);
            expect(res.text).to.equal('Channel not found');
        });
    });
});
