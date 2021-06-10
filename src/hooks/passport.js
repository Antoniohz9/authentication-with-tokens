const mySqlConnection = require('../database/conexion');
const jwt = require('jsonwebtoken');

function login (req, res){
    const {password,name} = req.body;
    mySqlConnection.query(`SELECT * FROM user WHERE password = '${password}' AND name = '${name}'`, (error, rows, fields) =>{
    if (!error) {
      // console.log(req.body);
      jwt.sign({user: rows[0].name}, 'secret',(err, token)=>{
        // jwt.sign({user: rows[0].name}, 'secret', {expiresIn: '1800s'},(err, token)=>{
          res.json({
            token: token,
            user: rows[0].name,
            rol: rows[0].rol,
          });
        });
    } else {
      console.log(error);
    }
  });
}
function auth(req, res, next){
// Autorization Bearer <token>
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secret',(err, auth)=>{
      if (err) {
        res.sendStatus(401);
      } else {
        // res.json({
        //   mensaje: 'token',
        //   data: auth
        // });
        next();
      }
    });

  } else {
    res.sendStatus(403);
  }
}
module.exports = {
  login,
  auth
}