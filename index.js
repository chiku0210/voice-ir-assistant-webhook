// Webhook HTTPS Endpoint:
// https://agile-island-40140.herokuapp.com/

const express = require("express");
const bodyParser = require("body-parser");
const secrets = require("./secrets");
const path = require("path");
const mongoose = require("mongoose");
const data = require("./data");
const PORT = process.env.PORT || 5000;
/*******************/

const { conversation } = require("@assistant/conversation");

// Databse

pwd = encodeURIComponent(secrets.pwd);
mongoose.connect(
  `mongodb+srv://root:${pwd}@hereisdx.khs4b.mongodb.net/voice-ir?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Create an app instance
const app = conversation();

// Register handlers for Actions SDK
app.handle("greeting", (conv) => {});

app.handle("crop_information_property_prompt", (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  console.log(conv, crop_name);
  conv.add(
    "धान भारत की एक महत्तवपूर्ण फसल है जो कि जोताई योग्य क्षेत्र के लगभग एक चौथाई हिस्से में उगाई जाती है और भारत की लगभग आधी आबादी इसे मुख्य भोजन के रूप में प्रयोग करती है। पिछले 45 वर्षों के दौरान पंजाब ने धान की पैदावार में बहुत ज्यादा उन्नति हासिल की है। नई टैकनोलोजी और अच्छी पैदावार करने वाले बीजों के प्रयोग के कारण धान की पैदावार पंजाब में सबसे ज्यादा होती है। "
  );
});

/*******************/

express()
  .use(bodyParser.json())
  .post("/", app)
  .get("/", async (_req, res) => {
    const ans = await data.get_properties("धान");
    console.log(ans);
    res.json({ status: "OK" });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
