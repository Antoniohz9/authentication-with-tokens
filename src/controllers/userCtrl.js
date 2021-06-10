const mySqlConnection = require('../database/conexion');
const jwt = require('jsonwebtoken');

// get all
function getUserAll(req,res){
  const user = {
    id: 1,
    nombre: "usuario",
    aPaterno: "apellido1",
    aMaterno: "apellido2"
  }
  res.json({
    mensaje: 'token',
    usuario: user
  })
}
// get by ID
function getUserByID(req,res, ){
  const {id} = req.query;
  mySqlConnection.query(`SELECT * FROM usuario WHERE id = '${id}'`, (error, rows, fields) =>{
    if (!error) {
      res.json(rows);
    } else {
      console.log(error);
    }
  });
};

module.exports = {
  getUserAll,
  getUserByID,
}