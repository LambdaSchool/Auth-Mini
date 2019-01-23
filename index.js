const express = require('express');
const server = express()
const cors = require('cors')
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const db = require('./database/dbHelpers');
const uuid = require('uuid/v1');
const bcrypt = require('bcryptjs');

server.use(cors(), helmet(), express.json());

const secret = ("easySecret");
//never do this in production 

function newToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: uuid()
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'invalid token' })
      } else {
        console.log('decoded token', decodedToken);
        if (req.username = decodedToken.username) {
          next()
        } else {
          res.status(401).json({ error: 'bad token' });
        };
      }
    })
  }
  else (res.json('no token'));
};

server.post('/api/register', (req, res) => {
  const user = req.body;
  const hashedPass = bcrypt.hashSync(user.password, 12)
  user.password = hashedPass;
  db.insertUser(user)
    .then(ids => {
      const id = ids[0];
      db.findByID(id)
        .then(user => {
          const token = (newToken(user));
          res.status(200).json({ id: user.id, token });
        })
        .catch(err => {
          console.log("error", err);
          res.status(500).json({ error: 'Something went wrong' })
        })
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db.findByUsername(creds.username)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = newToken(user);
        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ error: 'Cannot Login' })
      }
    })
    .catch(err => res.send(`${err}`));
});

server.get('/api/users', protected, (req, res) => {
  db.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
})



server.listen(5500, () => console.log('\nrunning on port 5500\n'));