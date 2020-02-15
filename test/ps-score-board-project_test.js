process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
const puppeteer = require('puppeteer');
var assert = require('chai').assert;

describe('Index.HTML Behavior', () => {
  let browser;
  let page;
  let logs = [];
  let errors = [];

  before(async () => {
    require('../server');
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    page.on('console', c => {
      console.log(c.text);
      logs.push(c.text);
    });
    page.on('pageerror', e => errors.push(e.text));
    await page.goto('http://localhost:9000');
  });

  it('page should have h1 @h1', async () => {
    const expectedHeader = 'Welcome to Score Board';
    const text = await page.$eval('h1', e => e.innerHTML.trim());
    assert.equal(
      text,
      expectedHeader,
      'Make sure you add h1 with text "Welcome to Score Board"'
    );
  });

  it("should have a title that's a child of the head element @title", async () => {
    const title = await page.evaluate(() => window.$('head > title').length);

    assert.equal(title, 1, 'Make sure to create a `title` element.');
  });

  it('should have a title that contains score board @title', async () => {
    const title = await page.evaluate(() => window.$('head > title').text());
    assert.equal(
      title,
      'Score Board',
      'Make sure to set the content of the `title` element to score board.'
    );
  });

  it("should have an `input` with `type=text` element that's a child of the `div` with `conatiner` class element @input", async () => {
    const input = await page.evaluate(
      () => window.$('.container > input').length
    );

    assert.isAtLeast(
      input,
      1,
      "Make sure to create an `input` with `type=text` element that's a child of the `div` with `conatiner` class element."
    );
  });

  it("should have a `button` that's a child of the `container div` @incrementbutton", async () => {
    const button = await page.evaluate(() => window.$('div >button').length);

    assert.isAtLeast(
      button,
      1,
      "Make sure to create an `input` with `type=text` element that's a child of the `div`."
    );
  });

  it('should have a `button` that\'s a child of the `container div` that says "Increment" @incrementbutton', async () => {
    const buttonText = await page.evaluate(() =>
      window
        .$('div >button')
        .first()
        .text()
    );

    assert.equal(
      buttonText,
      'Increment',
      'Make sure to create a `button` that\'s a child of the `container div` that says "Increment"'
    );
  });

  it('should have a `button` that\'s a child of the `container div` that says "Increment". Add Class `button increment` to this button @incrementbutton', async () => {
    const buttonClass = await page.evaluate(() =>
      window
        .$('div >button')
        .first()
        .attr('class')
    );

    assert.equal(
      buttonClass,
      'button increment',
      'Make sure to create a `button` that\'s a child of the `container div` that says "Increment". Add Class `button increment` to this button'
    );
  });

  it("should have a `button` that's a child of the `container div` @decrementbutton", async () => {
    const button = await page.evaluate(
      () => window.$('div > button').last().length
    );

    assert.isAtLeast(
      button,
      1,
      "Make sure to create an `input` with `type=text` element that's a child of the `div`."
    );
  });

  it('should have a `button` that\'s a child of the `container div` that says "Decrement" @decrementbutton', async () => {
    const buttonText = await page.evaluate(() =>
      window
        .$('div > button')
        .last()
        .text()
    );

    assert.equal(
      buttonText,
      'Decrement',
      'Make sure to create a `button` that\'s a child of the `container div` that says "Decrement"'
    );
  });

  it('should have a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button @decrementbutton', async () => {
    const buttonClass = await page.evaluate(() =>
      window
        .$('div > button')
        .last()
        .attr('class')
    );

    assert.equal(
      buttonClass,
      'button decrement',
      'Make sure to create a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button'
    );
  });

  it("should have a script that's a child of the head element @script", async () => {
    const scripts = await page.evaluate(() => window.$('head > script').length);

    assert.equal(scripts, 2, 'Make sure to add script tag.');
  });

  it("should have a `script` element with `/index.js` src that's a child of the `head` element @script", async () => {
    const script = await page.evaluate(() =>
      window
        .$('head > script')
        .last()
        .attr('src')
    );

    assert.equal(
      script,
      './index.js',
      "Create a `script` element with `/index.js` src that's a child of the `head` element"
    );
  });

  it('Add an callback function `on` increment button `click` event. In this call back you will read the value of `input textbox` and increment it by 1 @incrementcount', async () => {
    await page.click('input');
    await page.type('input', '4');
    await page.click('.increment');
    const count = await page.$eval('input', e => e.value);
    assert.equal(count, 5);
  });

  it('Add a call back jquery function `on` decrement button `click` event. In this call back you will read the value of `input textbox` and decrement it by 1 @decrementcount', async () => {
    await page.click('input');
    await page.type('input', '4');
    await page.click('.decrement');
    const count = await page.$eval('input', e => e.value);
    assert.equal(count, 53);
  });
});
