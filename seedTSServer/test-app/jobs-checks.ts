import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
 
describe("jobs", () => {

    it("jobs list should be accessible", () => {
        browser.get('/');
        expect(browser.getTitle()).to.eventually.equal('pluralsight-ci');
    });

    it("jobs list should be populated", () => {
    });

    it("posting job should work", () => {
    });
});