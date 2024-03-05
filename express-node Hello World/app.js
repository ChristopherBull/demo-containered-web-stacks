const express = require('express');
const app = express();
const port = 3000;

/**
 * Define a route for the root URL, and send a simple response.
 * When a request is made to the root URL, the server will respond with "Hello World! This is a web response."
 * To test this, open a web browser and navigate to http://localhost:3000/.
 */
app.get('/', (req, res) => {
  res.send('Hello World! This is a web response.');
});

/**
 * Start this simple web server, listening on port 3000.
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
