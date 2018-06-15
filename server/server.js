const express = require('express');
const cors = require('cors');

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
}

server.use(cors(corsOptions))

setupMiddleware(server);
setupRoutes(server);

db.connectTo('authii')
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
