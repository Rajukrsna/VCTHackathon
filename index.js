const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Home route to display the chat interface
app.get('/', (req, res) => {
  res.render('index', { response: null }); // Pass a default response value
});

// Endpoint to handle chat inputs
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await axios.post('https://uc9u77dh1h.execute-api.us-east-1.amazonaws.com/dev/chat', {
      query: userInput
    });
    
    console.log(response.data); // Log the response data to see its structure
    res.render('index', { response });
  } catch (error) {
    console.error(error);
    res.render('index', { response: { data: "Error: Unable to get a response from the server." } });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
