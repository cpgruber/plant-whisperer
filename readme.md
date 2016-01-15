# Plant Whisperer

For a healthy case of the feels, what [this video](https://vimeo.com/151856322)

The Plant Whisperer is an app that allows Twitter users to get notifications to water their houseplants. The app is built on the MEAN stack and leverages scheduled jobs to and the Twitter API to fire off tweets to users.

### Technologies Used
* Node.js and Express and the following dependencies:
  * twit - Twitter API wrapper
  * moment - to help deal with Date() math
  * passport - OAuth engine
  * passport-twitter - Twitter OAuth strategy
  * mongoose - MongoDB ORM
* Angular.js
* MongoDB

### Back-end
The back-end of the app is fairly straightforward - a user has plants. Instead of nesting plants as subdocuments of users, I made a separate plant collection and joined it to users by `plant._id`. This way, I could query all the plants at once to figure out which need to notify their owners versus querying all the users then their plants.

### Front-end
The front-end of the app was unnecessarily complex. I decided to use Angular because I wanted to have a fully MEAN stack app instead of another MEN app with an object oriented front-end. To start, I made the front-end with OOJS and it worked fine. Switching it to Angular posed a few roadblock (mostly fussing with date formats), but I got it working. The front-end is fairly simple (just a form, really), I think I could have gotten away without using Angular.

### The Bot
The twitter bot component runs on an hourly schedule. The database is checked for plants where `next_water` is less than the current time. For these plants, a tweet is sent to their owners on their behalf and then their `next_water` interval gets reset.

I wanted to make this more interactive-- rather than resetting the interval immediately, I wanted the human to have to reply to the tweet to acknowledge that the plant has been watered. To do this, I set up a new model for a Tweet, which has information about who it was sent to, when, and if it was replied to. I'm planning on getting this functionality to work soon. Ideally, I want the user to have to reply with a 💧to reset the interval.

### Unsolved Issues
Less unsolved issues, more of ran out of time.
1. Weather- for outdoor plants, I wanted to fire a tweet whenever it is below freezing in the plant's zipcode. I ran out of time to fully flesh this out in production, but I was able to hookup the Weather Underground API no problem. Hope this will come later.
2. Replies to tweets- I got close with this as well, but had to exclude it in production. I was running into some issues with synchrony of Twitter API calls, and needed to run them recursively instead. With a little more time, I think I could have figured this out.

### Install locally
1. Fork and clone this repo
2. `$ npm install` dependencies
3. Since this app uses Twitter OAuth, you'll have to [register an app](http://dev.twitter.com/apps) with twitter. Here you will get your keys and tokens for your `env.js` file. When registering the app, configure the callback url to your computer `127.0.0.1:port`
4. Configure `env.js` as follows:
```
module.exports = {
consumerKey:"TWITTER CONSUMER KEY",
consumerSecret:"TWITTER CONSUMER SECRET",
accessToken:"TWITTER ACCESS TOKEN",
tokenSecret:"TWITTER ACCESS TOKEN SECRET",
callback: "CALLBACK URL SPECIFIED FOR TWITTER",
sessionSecret:"ANY STRING"
}
```
5. Make sure Mongo is running: `$ mongod`
6. Run index.js in node: `$ node index.js` or `$ nodemon`
