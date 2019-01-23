const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());

function generateToken(username) {
    const payload = {
        username: username
    };

    const secret = "reallysecuresecret";

    const options = {
        expiresIn: "12h",
        jwtid: "98765"
    };

    return jwt.sign(payload, secret, options);
}

server.post("/api/register", (req, res) => {
    if (req.body.username && req.body.password && typeof req.body.username === "string" && typeof req.body.password === "string") {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password);
        db("users")
            .insert(user)
            .then(ids => {
                res.status(201).json(ids[0]);
            }).catch(error => {
                res.status(500).json({message: "Error registering user", error: error});
            });
    } else {
        res.status(400).json({ error: "Incorrectly formatted user data" });
    }
});

server.post("/api/login", (req, res) => {
    
});

server.get("/api/users", (req, res) => {
    
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});