let mysql = require('mysql');

class DB {
    constructor(){
        this.config = {
            host: 'localhost',
            user: 'Justin',
            password: 'l5162891',
            database: 'Justin'
        };

        this.secret = 'meowmoewwoofwoof';
    }

    Insert(table, obj, cb){
        let connection = mysql.createConnection(this.config);
        connection.connect();
        connection.query("INSERT INTO ?? SET ?", [table, obj], (err, result)=>{
            console.log(result);
            connection.destroy();
            cb(err, result);
        });
    }

    Select(table, where, cb){
        let connection = mysql.createConnection(this.config);
        connection.connect();
        connection.query("SELECT * FROM ??", [table], (err, result)=>{
            console.log(result);
            connection.destroy();
            cb(err, result);
        });
    }
    
    _Login(info, cb){
        let connection = mysql.createConnection(this.config);
        connection.connect();
        connection.query("SELECT * FROM User WHERE account = ? AND password = ?", 
            [info.account, info.password], (err, result)=>{
            console.log(result);
            connection.destroy();
            cb(err, result);
        });
        
    }
}

module.exports = DB;
