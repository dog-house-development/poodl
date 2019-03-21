const { By } = require('selenium-webdriver');

module.exports = {
    getUsernameDropdown: admin => By.xpath(`//span[text()='${admin.firstName + ' ' + admin.lastName}']`),
    logout: By.xpath("//button[text()='Log out']"),
    login: By.xpath("//a[text()='Log in']")
};
