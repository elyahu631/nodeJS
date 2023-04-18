// Import packages
const express = require('express');
const path = require('node:path');
const cors = require('cors');



// Set up port
const PORT = process.env.PORT || 5008;

// Create server
const server = express();
server.use(express.json());
server.use(cors());


// Set up static files
server.use(express.static(path.join(__dirname, 'dist')));

// Set up routes
server.use('/api/stores/', require('./Routes/stores'));

// Connect React to the server
server.get('/*', async (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    res.status(500).json({error});
  }
});


// Start the server
server.listen(PORT, ()=>console.log(`http://localhost:${PORT}`));