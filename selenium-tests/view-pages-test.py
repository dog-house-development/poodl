import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

if "CI" in os.environ:
    # code from https://docs.travis-ci.com/user/gui-and-headless-browsers/
    # Use sauce labs remote driver
    username = os.environ["SAUCE_USERNAME"]
    access_key = os.environ["SAUCE_ACCESS_KEY"]
    capabilities = {}
    capabilities['browserName'] = "chrome"
    capabilities['platform'] = "Windows 10"
    capabilities['version'] = "72.0"
    capabilities["tunnel-identifier"] = os.environ["TRAVIS_JOB_NUMBER"]
    capabilities["build"] = os.environ["TRAVIS_BUILD_NUMBER"]
    capabilities["tags"] = [os.environ["TRAVIS_PYTHON_VERSION"], "CI"]
    hub_url = "%s:%s@localhost:4445" % (username, access_key)
    driver = webdriver.Remote(desired_capabilities=capabilities, command_executor="http://%s/wd/hub" % hub_url)
else:
    # set driver to chrome
    driver = webdriver.Chrome(ChromeDriverManager().install())
    # driver = webdriver.Chrome()

# wait 5 seconds for page to load
driver.implicitly_wait(5)
driver.get('http://poodl-dev.herokuapp.com')

# click login link in header
login = driver.find_element_by_xpath('//a[@href="/login"]')
login.click()

# enter email in field
loginEmail = driver.find_element_by_id('email')
loginEmail.send_keys('test1@test.test')

# enter password
loginEmail = driver.find_element_by_id('password')
loginEmail.send_keys('testtt')

# click submit to login
submitLogin = driver.find_element_by_xpath('//button[@type="submit"]')
submitLogin.click()

# click view admins link
adminsLink = driver.find_element_by_xpath('//a[@href="/admins"]')
adminsLink.click()

#go back to dashboard
homeLink = driver.find_element_by_xpath('//a[@href="/dashboard"]')
homeLink.click()

# click view volunteers link
volunteersLink = driver.find_element_by_xpath('//a[@href="/volunteers"]')
volunteersLink.click()

#go back to dashboard
homeLink = driver.find_element_by_xpath('//a[@href="/dashboard"]')
homeLink.click()

# click view members link
membersLink = driver.find_element_by_xpath('//a[@href="/members"]')
membersLink.click()

#go back to dashboard
homeLink = driver.find_element_by_xpath('//a[@href="/dashboard"]')
homeLink.click()

# click logout button
logout = driver.find_element_by_xpath('//button[contains(text(), "Log out")]')
logout.click()

driver.quit()
