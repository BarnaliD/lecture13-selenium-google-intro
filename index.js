//We want to pull out builder,by,key,until from the selenium library
const { Builder,By, Key, until} = require('selenium-webdriver');
// we import should()from chai
const should = require('chai').should();

(async function googleSearch() {

    //Create new instancr of firefox
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        //Go to google .com
        await driver.get('https://www.google.com/en');
        // Find the accept cookie button
        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        //Click the accept cookie button
        await cookieButton[1].click();
        //Wait until the element is located,inthis case search bar
        await driver.wait(until.elementsLocated(By.name('q')),10000);
        //Selenium is too fast better wait for 1 sec
        await driver.sleep(1000);
        //Write something in search bar and press enter
        await driver.findElement(By.name('q')).sendKeys('Selenium',Key.ENTER);
        //Wait until elements are located
        await driver.wait(until.elementsLocated(By.css('h3')),10000);

        //Get the link text
        let firstLink = await driver.findElement(By.css('h3'));
        let linkText = await firstLink.getText();
        console.log(linkText);

        //Assert linkText
        linkText.should.equal('Selenium');
        // should always run 
        if(linkText === 'Selenium') {
            await firstLink.click();
        }else {
            console.log('First link is not "Selenium"');
        }

        //Wait untils the site loads and display title
        await driver.wait(until.titleContains('Selenium'),10000);
        //Get the title
        let title = await driver.getTitle();
        //Assert the title
        title.should.include('Selenium');

    }catch(error) {
        console.log(error);
    } finally {
        console.log('Test ran sucesfully');
        await driver.sleep(5000);
        await driver.quit();
    }


})();