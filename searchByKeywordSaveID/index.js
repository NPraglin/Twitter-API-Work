// Connect to twitter via API
// const Twitter = require('twitter-v2');
// const config = require('./config');
const needle = require('needle');
const Sheet = require ('./sheet');
const twitter = require ('./config.js');

// This is the bearer token, obviously
const token = twitter.bearer_token;

// This is the api V2 search
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";


// Step two of order of operations.. Invoke thy function
async function codeA(searchKeys) {

  try {
      // Make request
      const response = await getRequest(searchKeys);
      console.dir(response, {
          depth: null
      });
    
  } catch (e) {
      console.log(e);
      process.exit(-1);
  }
  process.exit();
};

// Step three in order of operations..
// Search tweets based on keywords in Spreadsheet
async function getRequest(searchKeys) {
  // by default, only the Tweet ID and text fields are returned
  const params = {
      'query': `${searchKeys}`, // pulls from google sheet
      'tweet.fields': 'text'
  }

  const res = await needle('get', endpointUrl, params, {
    headers: {
        "User-Agent": "v2RecentSearchJS",
        "authorization": `Bearer ${token}`
    }
})

  if (res.body) {
    
    // console.log(res.body.data[1].id)
    return res.body.data[1]

  } else {
    throw new Error('Unsuccessful request');
  }

};

// Pull Keywords from Spreadsheet and begin our code
// Order of operations is ... mainCode, codeA, getRequest
(async function mainCode(){

  const sheet = new Sheet();
  await sheet.load();
  const keys = await sheet.getRows();
  const searchKeys = keys[0].keyword;
  console.log(searchKeys);

  await codeA(searchKeys)

  // Can't get add to googlesheet working, reference sheet.js for functions
  
})();



