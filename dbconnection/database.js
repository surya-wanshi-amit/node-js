const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rewoke'
  })

  connection.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });
    module.exports=connection