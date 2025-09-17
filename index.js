const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// If Application Insights connection string is present, auto-setup.
if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  const appInsights = require('applicationinsights');
  appInsights.setup().start();
  console.log('Application Insights enabled');
}

app.get('/', (req, res) => {
  res.send(`Hello from Azure App Service! Secret: ${process.env.MY_SECRET || 'not set'}`);
});

// export for tests
if (require.main === module) {
  app.listen(port, () => console.log(`Listening on ${port}`));
} else {
  module.exports = app;
}
