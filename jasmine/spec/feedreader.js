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
        it('had URL defined', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('had the NAME defined', function() {
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
         it('is hidden by default', function() {
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
          it('click event toggle menu', function() {
            // Selects the menu-icon link object
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            // expect the body no longer has the hidden class
            expect($(document.body).hasClass('menu-hidden')).toBe(false);
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
            loadFeed(0, done);
         });

         // checks the .feed container to have at least one entry
         it('add at least one element to the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         // execute the load function for the first element on the allFeed list.
         it('changes the content in the .feed container', function(done) {
            var innerContentHTML = '';
            loadFeed(0, function() {
                // gets the html for the loaded element
                innerContentHTML = $('.feed').html();

                // load another feed
                loadFeed(1, function() {
                    // compare both contents to be different
                    expect($('.feed').html() !== innerContentHTML).toBe(true);
                    // call the done validation
                    done();
                });
            });
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
            //add the 'New Entry' to the all feeds so it will be updated next
            allFeeds.push({name:'New Entry', url:'http://googleblog.blogspot.com/' });
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

    // the feeds loaded  in the feed list are added to the localStorage to have a record of 
    // the previously loaded feeds, and they are loaded in the list from the localStorage
    describe('LocalStorage Feeds', function() {
        it('Populate feed list with localStorage feeds',function() { 
            //call method that move feeds from the localStorage to the list
            moveFeedFromLocalStorage(allFeeds);
            
            // get the feeds from the localStorage, the localStorage has the entries from the 
            // async call
            var localFeeds = JSON.parse( localStorage.getItem('feeds') );
            // get the links from the feed list
            var feedLinks = $('.feed a').map(function() {
                return $(this).attr('href');
            });

            //expect each of the local storage items to be in the list only one time.
            localFeeds.forEach(function(feed) {
                // count the number of urls per feed.link
                var filteredUrls = feedLinks.filter(function(url) {
                    return feed.link === url;
                });
                expect(filteredUrls).toBe(1);
            });
        });
    });

    // the feed list's li that had the class 'feed-image' must have a inner image with
    // a class feed-thumb, and can only have one image.
    describe('Images in the feedlist',function() {
        it('feed with images had the image class', function() {
            // get all current feeds with the feed-image class
            var feedAnchors = $('.feed-image a');
            feedAnchors.forEach(function(anchor) {
                // expect every image in the the feed-image li to have only one image
                expect( $(anchor).find('img').length ).toBe(1);
                // expect every image to have the feed-thumb class
                expect( $(anchor).find('img.feed-thumb').length ).toBe(1);
            });
        });
    });

    // Test the social services of the feed.
    describe('Social', function() {
        // get the social counters per feed
        it('get social counters', function(done) {
            // call the function that loads the social counters for a feed
            loadSocialCounters(0,function() {
                // expect the first element to have the html for 
                // twitter, facebook and google counters
                listItem = $( $('.feed li')[0] );
                expect(listItem.find('twitter-counter').length).toBe(0);
                expect(listItem.find('.facebook-counter').length).toBe(0);
                expect(listItem.find('.google-counter').length).toBe(0);
                done();    
            });
        });
    });

}());
