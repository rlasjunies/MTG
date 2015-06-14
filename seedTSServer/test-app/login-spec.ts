// Use the external Chai As Promised to deal with resolving promises in expectations.
import $log = require("../services/logger");
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('mtg homepage', function() {
  it('check title', function() {
    // Load the AngularJS homepage.
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).to.eventually.equal("Corrine Païre-Lasjunies");

    // Find the element with ng-model matching 'yourName' - this will
    // find the <input type="text" ng-model="yourName"/> element - and then
    // type 'Julie' into it.
    //element(by.model('yourName')).sendKeys('Julie');
    
    // Find the element with binding matching 'yourName' - this will
    // find the <h1>Hello {{yourName}}!</h1> element.
    //var greeting = element(by.binding('yourName'));

    // Assert that the text element has the expected value.
    // Protractor patches 'expect' to understand promises.

    //expect(greeting.getText()).toEqual('Hello Julie!');

//     let cpl = element(by.id('corinnepairelasjunies'));
//     let artist = element(by.id('artisitepeintre'));
// 
//     expect(cpl.getInnerHtml()).to.eventually.equal("CORRINE PAIRE LASJUNIES");
//     expect(artist.getInnerHtml()).to.eventually.equal("essai");
    
  });
  it('check text on main 1st tab', function() {
    let cpl = browser.element(by.id('corinnepairelasjunies'));
    let artist = browser.element(by.id('artisitepeintre'));
    
    $log.info(JSON.stringify(cpl));
    expect(cpl.getInnerHtml).to.eventually.equal("CORRINE PAIRE LASJUNIES");
    expect(artist[0].getInnerHtml()).to.eventually.equal("essai");
    
  });
  
  
  
});
