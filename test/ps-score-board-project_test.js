var jsdom = require('jsdom'),
  fs = require('fs'),
  assert = require('chai').assert,
  file = fs.readFileSync('index.html').toString();

var { JSDOM } = jsdom;

describe('ScoreBoard App', function() {
  var window, $;

  before(function() {
    window = new JSDOM(file).window;
    $ = global.jQuery = require('jquery')(window);
  });

  describe('ScoreBoard Index Html Page', function() {
    it("should have a title that's a child of the head element @title", function() {
      assert.equal(
        $('head > title').length,
        1,
        'Make sure to create a `title` element.'
      );
    });

    it('should have a title that contains score board @title', function() {
      assert.equal(
        $('head > title').text(),
        'Score Board',
        'Make sure to set the content of the `title` element to score board.'
      );
    });

    it("should have an `input` with `type=text` element that's a child of the `div` with `conatiner` class element @input", function() {
      assert.isAtLeast(
        $('.container > input').length,
        1,
        "Make sure to create an `input` with `type=text` element that's a child of the `div` with `conatiner` class element."
      );
    });

    it("should have a `button` that's a child of the `container div` @incrementbutton", function() {
      assert.isAtLeast(
        $('div >button').length,
        1,
        "Make sure to create an `input` with `type=text` element that's a child of the `div`."
      );
    });

    it('should have a `button` that\'s a child of the `container div` that says "Increment" @incrementbutton', function() {
      assert.equal(
        window
          .$('div > button')
          .first()
          .text(),
        'Increment',
        'Make sure to create a `button` that\'s a child of the `container div` that says "Increment"'
      );
    });

    it('should have a `button` that\'s a child of the `container div` that says "Increment". Add Class `button increment` to this button @incrementbutton', function() {
      assert.equal(
        window
          .$('div > button')
          .first()
          .attr('class'),
        'button increment',
        'Make sure to create a `button` that\'s a child of the `container div` that says "Increment". Add Class `button increment` to this button'
      );
    });

    it("should have a `button` that's a child of the `container div` @decrementbutton", function() {
      assert.isAtLeast(
        $('div > button').last().length,
        1,
        "Make sure to create an `input` with `type=text` element that's a child of the `div`."
      );
    });

    it('should have a `button` that\'s a child of the `container div` that says "Decrement" @decrementbutton', function() {
      assert.equal(
        window
          .$('div > button')
          .last()
          .text(),
        'Decrement',
        'Make sure to create a `button` that\'s a child of the `container div` that says "Decrement"'
      );
    });

    it('should have a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button @decrementbutton', function() {
      assert.equal(
        window
          .$('div > button')
          .last()
          .attr('class'),
        'button decrement',
        'Make sure to create a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button'
      );
    });

    it('should have a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button @decrementbutton', function() {
      assert.equal(
        window
          .$('div > button')
          .last()
          .attr('class'),
        'button decrement',
        'Make sure to create a `button` that\'s a child of the `container div` that says "Decrement". Add Class `button decrement` to this button'
      );
    });
    it("should have a script that's a child of the head element @script", function() {
      assert.equal(
        $('head > script').length,
        2,
        'Make sure to create a `title` element.'
      );
    });

    it('should have a title that contains score board @title', function() {
      assert.equal(
        window
          .$('head > script')
          .last()
          .attr('src'),
        './index.js',
        'Make sure to set the content of the `title` element to score board.'
      );
    });
  });
});
