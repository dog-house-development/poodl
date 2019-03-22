const { By, until } = require('selenium-webdriver');
const navBar = require('./navBar.js');
const adminData = require('../data/admin.json');
const admin = adminData.admins[0];

module.exports = {
    email: By.id('email'),
    password: By.id('password'),
    login: By.xpath("//button[text()='Log in']"),

    doLogIn: async function(driver) {
        await driver.get('http://localhost:3000/login');
        await driver.findElement(this.email).sendKeys(admin.email);
        await driver.findElement(this.password).sendKeys('123');
        await driver.findElement(this.login).click();
        await driver.wait(until.elementLocated(navBar.getUsernameDropdown(admin)), 2000);
    }
};
