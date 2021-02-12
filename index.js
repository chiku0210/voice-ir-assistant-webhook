const express = require("express");
const { conversation } = require("@assistant/conversation");
const bodyParser = require("body-parser");
const db = require("./db");
const PORT = process.env.PORT || 5000;
const app = conversation(); // Actions
db(); // Setup database

app.handle("crop_information_property_prompt", (conv) => {
  const crop_name = conv.session.params.crop_name_slot;
  console.log(conv, crop_name);
  conv.add(
    "धान भारत की एक महत्तवपूर्ण फसल है जो कि जोताई योग्य क्षेत्र के लगभग एक चौथाई हिस्से में उगाई जाती है और भारत की लगभग आधी आबादी इसे मुख्य भोजन के रूप में प्रयोग करती है। पिछले 45 वर्षों के दौरान पंजाब ने धान की पैदावार में बहुत ज्यादा उन्नति हासिल की है। नई टैकनोलोजी और अच्छी पैदावार करने वाले बीजों के प्रयोग के कारण धान की पैदावार पंजाब में सबसे ज्यादा होती है। "
  );
});

express()
  .use(bodyParser.json())
  .post("/", app)
  .get("/", async (_req, res) => {
    res.json({ status: "OK" });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
