
const Twitter = require('twitter');
const Sheet = require('./sheet');
const creds = require('./twittercreds');

exports.postTweet = async (event, context) => {


creds.client


// Pull Next Tweet from SS
const sheet = new Sheet();
await sheet.load();
const quotes = await sheet.getRows();
const status = quotes[0].quote;

// Send Tweet
client.post('statuses/update', {status},  function(error, tweet, response) {
  if(error) throw error;
});

// Remove quote from SS
await quotes[0].delete();

console.log('tweeted', quotes[0].quote);
};
