const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const Promise = require("bluebird");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const {Builder, By, Key, until} = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');
var driver;

const options = new chrome.Options();
options.addArguments(
    'headless'
);

var rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

describe('list view test', function() {
    this.timeout(100000);

    before(function(done){
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.get('http://localhost:8000')
            .then(()=>{
                console.log("Got page");
                done();
            });
    });

    after(function(){
        driver.quit();
    })

    it('should test load the page', async function(){
        let page = await driver.getPageSource();
    });

    it('should ignore empty input and not add new element to list', async function(){
        let input = await driver.findElement(By.id("input"));
        input.sendKeys("");
        let val = await input.getAttribute('value');

           let button = await driver.findElement(By.id("button"));
           let bevent = await button.click();

           let list = await driver.findElements(By.tagName("li"));
           expect(list.length).to.equal(0);

           input.sendKeys(" ");
        val = await input.getAttribute('value');

           button = await driver.findElement(By.id("button"));
           bevent = await button.click();

           list = await driver.findElements(By.tagName("li"));
           expect(list.length).to.equal(0);

    });

    it('should get input and add new element to list', async function(){
            let input = await driver.findElement(By.id("input"));
            input.sendKeys("USA");
            let val = await input.getAttribute('value');

               let button = await driver.findElement(By.id("button"));
               button.click();

               let list = await driver.findElements(By.tagName("li"));
               expect(list.length).to.equal(1);

    });

    it('should check for red color of text for each 3rd element', async function(){
        
            let input = await driver.findElement(By.id("input"));
            let button = await driver.findElement(By.id("button"));
            input.clear();
            input.sendKeys("India");
               button.click();
               input.clear();
            input.sendKeys("France");
               button.click();
               input.clear();
            input.sendKeys("Spain");
               button.click();
               input.clear();

               let list = await driver.findElements(By.tagName("li"));
               let value = await list[2].getCssValue('color');
               value = value.substring(5, value.length-1)
             .replace(/ /g, '')
             .split(',');

            value.pop();
            let checkValue = value.reduce( (prev, curr) => prev + rgbToHex(curr), "#");
               expect(checkValue).to.equal('#ff0000');

    });
});