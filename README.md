# Project Development

- First of all I review the code and functionality of the application in my browser, I initiate and instance of the http-server to open the project. I found that is pretty straigh foward, a list view where the feeds are loaded, a left side bar that toggle visibility with the click of the button in the header navigation. 

- Then I start reviewing the code of the app.js, it has the list with the feeds called AllFeeds, page loading logic that fill the html list and add event handlers, also there is some basic logic  for the application.

- Next I start to read the feedreader.js specification for the test definition, and I found that the comments explain very well the expectations for each one of the tests.

- I start to develop the tests for the feed object, evaluating the URL and NAME definitions.

- Then I added some logic to test the menu click.

- Then I try to implement the logic to test the async calls of the application, I had some trouble defining how to use the before each but I revisit the video about async calls and the jasmine documentation, and with that I solve the problem.

- The remaining test I needed to validate if the content change when a loadFeed was called, I struggled a bit about it, but found the solution by adding and event to the html and identify if the dom three of the html container changed, and I added the done() call to that event.

- Added missing method from previous revisions, and update project using the comments from the Code Review of the project submission.


# Additional Test

AllFeeds Array methods
----------------------
- This tests assume that the page has some event that identify changes in the allFeeds object and update the menu, when the add, update or remove of an element happen to it.

- Add feed: Check that a new element added to the AllFeeds to appear in the list menu.

- Remove feed: Check that a removed feed get removed from the menu.

- Update feed URL: Check the update of the URL of a feed.

LocalStorage Feeds
----------------------
- This test assumes the existence of a method that moves feed entries from the localStorage to the feed list.
- LocalStorage Feeds: Check existence of the feed items of the localStorage in the Feed List, the elements can not be repeated.

Images in the feedlist
----------------------
- This test assume during the creation of the feed links there is a method that check for images and change the class of the list item, and the image to comply with the layout.

- Images in the feed-list: Check the feed list items that have the feed-image class to actually have an image, and the image in those list items to have the class feed-thumb

Social
----------------------
- This test assume there is an Async method that load the social counters of a feed, and it add them to the feed link html.

- Social: Check the creation of the social counters html of an list item


# Reference

- In the jquery API is explained how to simulate the click of an element.

https://api.jquery.com/click/

- Jasmine reference to have a deep understanding of the async calls management.

http://jasmine.github.io/2.0/introduction.html
