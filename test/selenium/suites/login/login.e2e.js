const mongoUnit = require('mongo-unit');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const adminData = require('../../data/admin.json');
const admin = adminData.admins[0];

// page objects
const loginPage = require('../../pageObjects/login.js');
const navBar = require('../../pageObjects/navBar.js');

const controller = require('../../controller.js');

module.exports = function() {
    beforeEach(async function() {
        await mongoUnit.initDb(process.env.MONGODB_URI, adminData);
    });

    it('should login successfully', async function() {
        const { driver } = controller;
        await driver.get('http://localhost:3000');
        await driver.findElement(navBar.login).click();
        await driver.findElement(loginPage.email).sendKeys(admin.email);
        await driver.findElement(loginPage.password).sendKeys('123');
        await driver.findElement(loginPage.login).click();
        await driver.wait(until.elementLocated(navBar.getUsernameDropdown(admin)), 2000);
    });

    it('should logout successfully', async function() {
        const { driver } = controller;
        await loginPage.doLogIn(driver);
        await driver.findElement(navBar.getUsernameDropdown(admin)).click();
        await driver.findElement(navBar.logout).click();
    });
};
