const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

class APITester {
    constructor(server) {
        this.server = server;
    }

    get(url, code, query = {}) {
        const req = chai.request(this.server).get(url).query(query);
        return this._handleResponse(req, code);
    }

    async _handleResponse(req, code) {
        const res = await req;

        expect(res).to.have.status(code);
        expect(res.text).to.not.be.empty;

        return req;
    }
}

module.exports = APITester;
