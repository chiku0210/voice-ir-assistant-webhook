const express = require("express");
const { conversation, Suggestion } = require("@assistant/conversation");
const bodyParser = require("body-parser");
const db = require("./db");
const PORT = process.env.PORT || 5000;
const app = conversation(); // Actions
db(); // Setup database

const { get_crop } = require("./data");

app.handle("crop_information_property_prompt", async (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  conv.add(`आप ${crop_name} के बारे में क्या जानना चाहते हैं?`);
  const crop = await get_crop(crop_name);
  const props = crop.properties.keys();
  for (let i = 0; i < 8; i++) {
    conv.add(new Suggestion({ title: props[i] }));
  }
});

express()
  .use(bodyParser.json())
  .post("/", app)
  .get("/", async (_req, res) => {
    res.json(await get_crop("धान"));
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
