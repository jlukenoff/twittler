/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  var wait = Math.random() * 15000;
  setTimeout(function() {
    var tweet = streams.home[streams.home.length - 1];
    var date = renderDate(tweet.created_at);
    var $tweet = $('<div class="tweet"></div>');      
    var $user  = $('<div class="card-header"></div>').text('@' + tweet.user + ':');
    var $createdTime = $('<span class="time"></span>').text(date).appendTo($user);
    $tweet.append($user);
    var $text = $('<div class="card-body"></div>').text(tweet.message).appendTo($tweet);
    $tweet.insertBefore('.tweet:first');
    scheduleNextTweet();
  }, wait);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};


//function for rendering apropriate date string
var renderDate = function(dateObj) {
  let months = ['Jan', 'Feb', 'March', 'April', "May", 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let isPM = false;
  let hours = dateObj.getHours();
  if (hours > 12) {
    hours = hours - 12;
    isPM = true; 
  }
  let mins = dateObj.getMinutes();
  let date = dateObj.getDate();
  let month = months[dateObj.getMonth() - 1];
  let year = dateObj.getFullYear();

  return hours + ':' + mins + (isPM ? 'pm' : 'am') + ' on ' + month + ' ' + date + ', ' + year; 
  
}
