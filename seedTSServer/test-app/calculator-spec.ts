import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised); 
var expect = chai.expect;

describe("angularjs homepage", function () {
  var firstNumber = element(by.model("first"));
  var secondNumber = element(by.model("second"));
  var goButton = element(by.id("gobutton"));
  var latestResult = element(by.binding("latest"));

  beforeEach(function() {
    browser.get("http://juliemr.github.io/protractor-demo/");
  });

  it("should have a title", function() {
    expect(browser.getTitle()).to.eventually.equal("Super Calculator");
  });
   
  it("should add one and two", function() {
    firstNumber.sendKeys("1");
    secondNumber.sendKeys("2");

    goButton.click();

    expect(latestResult.getText()).to.eventually.be.equal("3");
  });

  it("should add four and six", function() {
      firstNumber.sendKeys("4");
      secondNumber.sendKeys("6");

      goButton.click();
    expect(latestResult.getText()).to.eventually.be.equal("10");
  });
}); 