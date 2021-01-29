// https://agile-island-40140.herokuapp.com/

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000

/*******************/

const {
  conversation,
  Image,
} = require('@assistant/conversation')

// Create an app instance
const app = conversation()

// Register handlers for Actions SDK

app.handle('greeting', conv => {
  let message = 'A wondrous greeting, adventurer! Welcome back to the mythical land of Gryffinberg!';
  if (!conv.user.lastSeenTime) {
    message = 'Welcome to the mythical land of  Gryffinberg! Based on your clothes, you are not from around these lands. It looks like you\'re on your way to an epic journey.';
  }
  conv.add(message);
 });
 

/*******************/

express()
  .use(bodyParser.json())
  .post('/', app)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))