const mysql = require('mysql');

const dbConfig = {
  connectionLimit: 5,
  host: "YOUR_HOST",
  user: "YOUR_USER",
  password: "YOUR_PASSWORD",
  database: "YOUR_DATABASE",
};

const dbConfig1 = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'ned000...',
  database: 'hr'
};
// FOR LOCALHOST CHANGE dbConfig to dbConfig1 ON LINE NUMBER 24 AND 29
let pool;

// Try connecting with dbConfig
try {
  // pool = mysql.createPool(dbConfig) 
  pool = mysql.createPool(dbConfig);
 
} catch (error) {
  console.error('Error connecting to database with dbConfig. Trying dbConfig1...');
  // If an error occurs, fall back to the local database
  pool = mysql.createPool(dbConfig);
}

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error("Error connecting to database:", error.message);
        reject(error);
        return;
      }

      connection.query(query, values, (queryError, results, fields) => {
        connection.release();

        if (queryError) {
          reject(queryError);
        } else {
          resolve(results);
        }
      });
    });
  });
}

const a = async() => {

  const data = await executeQuery('select * from login;')
  console.log(data)
}
a()
module.exports = executeQuery;

