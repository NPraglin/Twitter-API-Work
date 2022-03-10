// Connect to twitter via API
const Twitter = require('twitter');
const config = require('./config');
const Sheet = require ('./sheet');

const client = new Twitter(config);

// This script requires Elevated Twitter API Access
// Get user IDs from spreadsheet
const returnedID = (async function(){

  const sheet = new Sheet();
  await sheet.load();
  const ids = await sheet.getRows();
  const userID = (ids[0].id);
  console.log(userID);

  return userID
  
  })()

// Follow a user using his/her user_id attribute passed from above function
client.post('friendships/create', { user_id: `${returnedID}` })
    .then(result => {

    console.log('Followed ' + userID + ' successfully!');
}).catch(console.error);

// take shot of whiskey for success