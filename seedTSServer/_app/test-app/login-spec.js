var $log = require("../services/logger");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
describe('mtg homepage', function () {
    it('check title', function () {
        browser.get('http://localhost:3000');
        expect(browser.getTitle()).to.eventually.equal("Corrine Païre-Lasjunies");
    });
    it('check text on main 1st tab', function () {
        var cpl = browser.element(by.id('corinnepairelasjunies'));
        var artist = browser.element(by.id('artisitepeintre'));
        $log.info(JSON.stringify(cpl));
        expect(cpl.getInnerHtml).to.eventually.equal("CORRINE PAIRE LASJUNIES");
        expect(artist[0].getInnerHtml()).to.eventually.equal("essai");
    });
});
//# sourceMappingURL=login-spec.js.map