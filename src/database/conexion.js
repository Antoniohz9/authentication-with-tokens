const mysql = require('mysql');
function handleDisconnect() {

const myConnection = mysql.createConnection({
  // credenciales de Local
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'php01'
});

myConnection.connect(function(error){

  if (error) {
    console.log('La Base de datos no se pudo conectar:',error);
    setTimeout(handleDisconnect, 1000);
  } else {
    console.log('DataBase is success');  
  }
});
setInterval(function () {
  myConnection.query('SELECT 1');
}, 5000);
myConnection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
});
module.exports = myConnection;
};
handleDisconnect();