
const users = require ("../data/model");
module.exports=(req,res,next) => {
  
  const {user,password}=req.headers;

   req.session && req.session.user?next():res.status(401).json({message:'You Shall Not Pass.'});

  }