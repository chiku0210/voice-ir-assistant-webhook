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

app.handle('handler_name', conv => {
  conv.add('Hi, how is it going?')
  conv.add(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }))
})

/*******************/

express()
  .use(bodyParser.json())
  .post('/fulfillment', app)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))