const mysql = require('mysql'); 

const dbConfig = {
  connectionLimit: 10, 
  host: 'bqx57lsqss7qbxf79jcm-mysql.services.clever-cloud.com',
  user: 'utfadvz5as1u2vcb',
  password: 'Mc8sP4C8fQN2OnO69PUr',
  database: 'bqx57lsqss7qbxf79jcm'
};


const pool = mysql.createPool(dbConfig);

function executeQuery(query, values = []) {
     return new Promise((resolve, reject) => {
       pool.getConnection((error, connection) => {
         if (error) {
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
module.exports = executeQuery