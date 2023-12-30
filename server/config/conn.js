const mysql = require("mysql");

const dbConfig = {
    connectionLimit: 5, 
    host: "bqx57lsqss7qbxf79jcm-mysql.services.clever-cloud.com",
    user: "utfadvz5as1u2vcb",
    password: "Mc8sP4C8fQN2OnO69PUr",
    database: "bqx57lsqss7qbxf79jcm",
};

const pool = mysql.createPool(dbConfig);

const conn = function () {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error("Error connecting to database:", error.message);
        } else {
            console.log("Connected to database successfully!");
            connection.release(); 
        }
    });
};
conn();
