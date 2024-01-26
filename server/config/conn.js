const mysql = require("mysql");

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
// FOR LOCALHOST CHANGE dbConfig to dbConfig1 ON LINE NUMBER 25 AND 32

let pool;

const conn = function () {
    // Try connecting with dbConfig
    // pool = mysql.createPool(dbConfig);
    pool = mysql.createPool(dbConfig);
    
    pool.getConnection((error, connection) => {
        if (error) {
            console.error("Error connecting to database with dbConfig. Trying dbConfig1...");
            
            // If connection with dbConfig fails, try connecting with dbConfig1
            pool = mysql.createPool(dbConfig);
            
            pool.getConnection((error1, connection1) => {
                if (error1) {
                    console.error("Error connecting to database with dbConfig1:", error1.message);
                } else {
                    console.log("Connected to database successfully using dbConfig1!");
                    connection1.release();
                }
            });
        } else {
            console.log("Connected to database successfully using dbConfig!");
            connection.release();
        }
    });
};

conn();
