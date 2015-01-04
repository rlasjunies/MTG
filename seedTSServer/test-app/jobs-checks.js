var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
describe("jobs", function () {
    it("jobs list should be accessible", function () {
        browser.get('/');
        expect(browser.getTitle()).to.eventually.equal('pluralsight-ci');
    });
    it("jobs list should be populated", function () {
    });
    it("posting job should work", function () {
    });
});
//# sourceMappingURL=jobs-checks.js.map