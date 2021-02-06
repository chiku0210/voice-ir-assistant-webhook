http://agile-island-40140.herokuapp.com/

$intent.params.chosenUnavailableOption

```js
app.handle("intent_name", (conv) => {
  const option = conv.intent.params.chosenUnavailableOption.original;
  const optionKey = conv.intent.params.chosenUnavailableOption.resolved;
  let message = "I have seen the future and ";
  if (optionsNeedA.has(optionKey)) {
    message = message + "a ";
  }
  message = message + `${option} will not aid you on your journey. `;
  conv.add(message);
});
```

- intent vs slots
