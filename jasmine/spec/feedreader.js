/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('all URLS are defined', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length>0).toBe(true);
            });
        });

        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length>0).toBe(true);
            });
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        // declare variables
        var body = $('body');
        var menu_icon = $('.menu-icon-link');
        it('menu element is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
        it('menu changes visibility when the menu icon is clicked', function() {
            // does the menu display
            menu_icon.trigger("click");
            expect(!body.hasClass('menu-hidden')).toBe(true);

            // does the menu hide
            menu_icon.trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        // load loadFeed function
        // comment beforeEach to see if it works without asynchronous
        beforeEach(function(done) {
            loadFeed(0,done);
        });
         //define feed
        it('loadFeed function called -> at least single .entry element in .feed container', function() {
            // declare variables
            var feed = $('.feed .entry');
           // sibling exists
            expect(feed.length > 0).toBe(true);
            // console.log(feed.length);
        });
    });
    describe('New Feed Selection', function() {
         // load loadFeed function before beginning process
         var firstLoad, secondLoad;
         beforeEach(function(done) {
             loadFeed(0,done);
                // console.log("Async loaded first time");
        });
        // run the async function again for the second time to compare first and second
        it('loadFeed changes content', function(done) {
            var feed = $('.feed .entry');
            firstLoad = feed.html();
            // async function
            loadFeed(1,function() {
              var feed = $('.feed .entry')
              secondLoad = feed.html();
              expect(firstLoad === secondLoad).toBe(false);
              // console.log("Second Load");
              // console.log(secondLoad);
              done();
            });
            // console.log("First Load");
            // console.log(firstLoad);
        });
    });
}());
