require('chromedriver');
const webdriver = require('selenium-webdriver');

class Controller {
    constructor() {}

    initDriver() {
        this.driver = new webdriver.Builder().forBrowser('chrome').build();
    }

    quitDriver() {
        this.driver && this.driver.quit();
    }

    // Only use this for debugging purposes
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new Controller();
