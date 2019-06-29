const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const Promise = require("bluebird");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var chaiWebdriver = require('chai-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver'), chrome = require('selenium-webdriver/chrome');
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

describe('Reminder Test Results: \n', function() {
    this.timeout(100000);

    before(function(done){
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        chai.use(chaiWebdriver(driver));
        driver.get('http://localhost:8000')
            .then(()=>{
               
                done();
            });
    });

    after(function(){
        driver.quit();
    })

    it('should test load the page', async function(){
        let page = await driver.getPageSource();
    });

    // it ('should Render Page with Fields \'timerName\',\'time\' and \'addBtn\'', async function() {
    //     let inputField1 = await driver.findElement(By.id('timerName'));
    //     let inputField2 = await driver.findElement(By.id('time'));
    //     let addbButton = await driver.findElement(By.id('addBtn'));
    //     expect(inputField1).dom.to.be.visible();
    //     expect(inputField2).dom.to.be.visible();
    //     expect(addbButton).dom.to.be.visible();

    // });

    it ('should not add a card if either of the input field is Empty', async function() {
        let inputField1 = await driver.findElement(By.id('timerName'));
        let inputField2 = await driver.findElement(By.id('time'));
        let addbButton = await driver.findElement(By.id('addBtn'));
        await inputField1.sendKeys("");
        await inputField2.sendKeys("");
        await addbButton.click();
        let list = await driver.findElements(By.tagName("li"));
        expect(list.length).to.equal(0);

        // Empty Timer
        inputField1.clear();
        inputField2.clear();
        await inputField1.sendKeys("Reminder 1");
        await inputField2.sendKeys("");
        await addbButton.click();
        list = await driver.findElements(By.tagName("li"));
        expect(list.length).to.equal(0);

         // Empty Label
         inputField1.clear();
         inputField2.clear();
         await inputField1.sendKeys(" ");
         await inputField2.sendKeys("1s");
         await addbButton.click();
         list = await driver.findElements(By.tagName("li"));
         expect(list.length).to.equal(0);
    });

    // it ('should add a list item on clicking add', async function() {

    //     const LABEL1 = 'Reminder1';
    //     const TIMER1 = '1s';
    //     let inputField1 = await driver.findElement(By.id('timerName'));
    //     let inputField2 = await driver.findElement(By.id('time'));
    //     let addbButton = await driver.findElement(By.id('addBtn'));
    //     await inputField1.sendKeys(LABEL1);
    //     await inputField2.sendKeys(TIMER1);
    //     await addbButton.click();
    //     let list = await driver.findElements(By.tagName("li"));
    //     expect(list.length).to.equal(1);
    //     // var timerList = await driver.findElement(By.xpath(`//div[id='timerList' div[text()='${LABEL1}']]`));

    //     // expect(timerList.children.length).to.equal(1);
    //     // expect(timerList.children[0].children[0]).to.equal(LABEL1);
    //     // expect(timerList.children[0].children[2]).to.equal(TIMER1);

    //     // Empty Timer
    //     inputField1.clear();
    //     inputField2.clear();
    //     await inputField1.sendKeys("Reminder 2");
    //     await inputField2.sendKeys("1h");
    //     await addbButton.click();
    //     list = await driver.findElements(By.tagName("li"));
    //     expect(list.length).to.equal(2);

    //      // Empty Label
    //     inputField1.clear();
    //     inputField2.clear();
    //     await inputField1.sendKeys("Reminder 3");
    //     await inputField2.sendKeys("1m");
    //     await addbButton.click();
    //     list = await driver.findElements(By.tagName("li"));
    //     expect(list.length).to.equal(3);
    // });

    it ('should show a popup on adding element', async () => {
        const LABEL = 'Reminder_1';

        let inputField1 = await driver.findElement(By.id('timerName'));
        let inputField2 = await driver.findElement(By.id('time'));
        let addbButton = await driver.findElement(By.id('addBtn'));
        await inputField1.sendKeys(LABEL);
        await inputField2.sendKeys("10s");
        await addbButton.click();
        let list = await driver.findElements(By.tagName("li"));
        // expect(list.length).to.equal(1);
        driver.sleep(10000).then(async () => {
            let backDrop = await driver.findElement(By.id('backDrop'));
            let popup = await driver.findElement(By.id(LABEL));
            expect(backDrop).dom.to.be.visible();
        });
    });
});