const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const bcrypt=require('bcryptjs');
const knex=require('knex');
const knexConfig=require('./knexfile');
const cors=require('cors');
const db=knex(knexConfig.development);
const jwt=require('jsonwebtoken');
const server=express();

server.use(morgan('dev')).use(helmet()).use(cors()).use(express.json());

generateToken=(user)=>{
    const payload={
        username:user.username
    }
    const secret='I see dead people.'
    const options={
        expiresIn:'24h',
        subject:user.id.toString()
    }
    return jwt.sign(payload,secret,options);
}
server.post('/api/register',(req,res)=>{
    const newUser=req.body;
    const hash=bcrypt.hashSync(newUser.password,3);
    newUser.password=hash;

    db('user')
        .insert(newUser)
        .then(id=>res.status(201).json(id[0]))
        .catch(err=>res.status(500).json(err));
})
server.post('/api/login',(req,res)=>{
    const user=req.body;
    db('user')
        .where({username:user.username})
        .first()
        .then(response=>{
            if (response && bcrypt.compareSync(user.password,response.password)){
                const token=generateToken(response);
                res.status(200).json(token);
            } else {
                res.status(401).send('You shall not pass!');
            }
        })
        .catch(err=>res.status(500).send('You shall not pass!'))
})
const port=9000;
server.listen(port,()=>console.log('Engines firing server starting new horizons venturing.'));