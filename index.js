const express = require("express");
const { conversation, Suggestion } = require("@assistant/conversation");
const bodyParser = require("body-parser");
const db = require("./db");
const PORT = process.env.PORT || 5000;
const app = conversation(); // Actions
db(); // Setup database

app.handle("crop_information_property_prompt", (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  conv.add(`आप ${crop_name} के बारे में क्या जानना चाहते हैं?`);
  conv.add(new Suggestion({ title: "Soil" }));
});

express()
  .use(bodyParser.json())
  .post("/", app)
  .get("/", async (_req, res) => {
    res.json({ status: "OK" });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
