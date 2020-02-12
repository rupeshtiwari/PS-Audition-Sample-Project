process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
var http = require('http');
const puppeteer = require('puppeteer');
var assert = require('chai').assert;

describe('Index.HTML Behavior', () => {
  let browser;
  let page;
  let $;

  before(async () => {
    require('../server');
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  beforeEach(async function() {
    page = await browser.newPage();
    await page.addScriptTag({
      path: require.resolve('../lib/jquery/jquery.js')
    });
    await page.goto('http://localhost:9000');
  });
  afterEach(async function() {
    await page.close();
  });

  after(async function() {
    await browser.close();
  });

  it('page should have h1', async function() {
    const expectedHeader = 'Welcome to Score Board';

    const text = await page.evaluate(() =>
      window
        .$('h1')
        .text()
        .trim()
    );
    assert.equal(text,expectedHeader);
  });

  // it('button click should increase numbers', done => {
  //   var browser = this.browser;
  //   browser
  //     .pressButton('increment')
  //     .then(() => {
  //       assert.ok(browser.success);
  //       assert.equal(browser.text('count'), '1');
  //     })
  //     .then(done, done);
  // });
});
