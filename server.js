const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/db.js');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const server = express();
server.use(cors({ origin: 'http://localhost:3300', credentials: true }));

const secret = "nobody tosses dwarf!";

function generateToken(user) {
  const payload = {username: user.username}
  const options = {
    expiresIn: '1h',
    jwtid: '872891'
  }
  return jwt.sign(payload, secret, options);
}

// JWTs:
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Token Invalid' })
      }
      req.jwtToken = decodedToken;
      next();
    })
  } else {
    return res.status(401).json({ error: 'Incorrect credentials' });
  }
}

server.use(express.json());

// Endpoints go here
server.get('/', (req, res) => {
  res.send('API is running!');
});

server.post('/register', function(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  db('users')
    .insert(user)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user);
          // req.session.username = user.username;
          res.status(201).json(user);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.post('/login', function(req, res) {
  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        // req.session.username = user.username;
        res.send({token});
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.get('/users', protected, (req, res) => {
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json({error: 'Cannot GET Users'}));
});

server.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});

server.listen(3300, () => console.log('API is running on 3300'));