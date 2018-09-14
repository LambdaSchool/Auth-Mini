const express = require('express'); 
const knex = require('knex'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const dbConfig = require('./knexfile'); 
const cors = require ('cors')

 const server = express(); 
 const db = knex(dbConfig.development); 
 
 server.use(express.json()); 

 const secret = 'secret'
 
 function generateToken(user) {
    const payload = {
      username: user.username
    };
    const options = {
      expiresIn: "2h",
      jwtid: "54321",
    };
    return jwt.sign(payload, secret, options);
  }

 server.get('/', (req, res) => {
    res.send('Test');
});

server.post("/api/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db("users")
      .insert(creds)
      .then(ids => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token });
          })
          .catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
  });

  function protected(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err, decodedToken)=>{
            if(err){
                res.status(401).json({message: "Invalid Token"});
            }else{
                req.user = { username: decodedToken.username}; 
                next(); 
            }
        })
    }else{
        res.status(401).json({message: "no token provided"});
    }
}

server.post("/api/login", (req, res)=> {
    const creds = req.body; 

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)){
                const token = generateToken(user); 

                res.status(200).json({token}); 
            }else{
                res.status(401).json({message: "you shall not come in"})
            }
        })
        .catch(err => res.status(500).send(err)); 
})

server.get("/api/users", (req, res)=>{
    db("users")
    .select("id", "username", "password")
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
}); 

 server.listen(3000, () => {
    console.log("Server is listening on PORT 3000"); 
}); 