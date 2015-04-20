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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('All feeds had the URL defined', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All feeds had the NAME defined', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu is hidden by default', function() {
            // select the document's body
            var documentBody = $(document.body);
            // expect the body to had the menu-hidden class by default
            expect(documentBody.hasClass('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu is clicks toggle menu', function() {
            // Selects the menu-icon link object
            var menuIcon = $('.menu-icon-link');
            // perform a click action
            menuIcon.click();
            // expect the body no longer has the hidden class
            expect($(document.body).hasClass('menu-hidden')).toBe(false);
            // perform a click action again
            menuIcon.click();
            // expect the body to had the hidden class
            expect($(document.body).hasClass('menu-hidden')).toBe(true);         
         });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         

         // execute the load function before the expectations, and send the done
         // object to identify if the callback is succesfull
         beforeEach( function(done) {
            loadFeed(0, function(){
                done();
            });
         });

         // checks the .feed container to have at least one entry
         it('LoadFeed add at least one element to the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });


    /* ADDITIONAL FEEDS */


    
    describe('AllFeeds Array methods', function() { 
        // Expect the addition of an element to the allFeeds Object to update the HTML of the menu 
        it('Add feed entry', function() {
            allFeeds.push({name:'New Entry', url:'http://googleblog.blogspot.com/' });
            expect($('.feed-list li:contains("New Entry")').length).toBeGreaterThan(0);
        });

        // Expect the removal of an element in the allFeeds array to remove the HTML LI of the menu
        it('Remove feed entry', function() {
            // Filter the elements of the all feed
            allFeeds = allFeeds.filter(function(feed) {
                return feed.name !== 'New Entry'; 
            });

            // Look for an li with the text 'New Entry' and expect to not exist
            expect($('.feed-list li:contains("New Entry")').length).toBe(0);
        });

        // expect the update of an element in the allFeeds array to update the corresponding 
        // HTML LI of the menu
        it('Update feed entry', function() {
            // look for the feed with the name 'New Entry' and modified the name property for 
            // 'Brand New entry'
            allFeeds.forEach( function( feed, index ) {
                if( feed.name === 'New Entry' ) {
                    allFeeds[index].name = 'Brand New Entry';
                }
            });

            //First check the previous element not longer exists and the new one does
            expect($('.feed-list li:contains("New Entry")').length).toBe(0);
            expect($('.feed-list li:contains("Brand New Entry")').length).toBeGreaterThan(0);
        });
    });


}());
