let mysql = require('mysql');

class DB {
    constructor(){
        this.config = {
            host: '',
            user: '',
            password: '',
            database: ''
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
        connection.query("SELECT * FROM ?? WHERE ?", [table, where], (err, result)=>{
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

    _Rate(id, score, cb){
        this.Select('User', {id}, (err, result)=>{
            if(result.length == 1){
                let totalScore = result[0].score + parseInt(score);
                let totalCnt = result[0].scoreCnt + 1;
                let connection = mysql.createConnection(this.config);
                connection.connect();
                connection.query("UPDATE User SET ? WHERE ?", 
                    [{score: totalScore, scoreCnt: totalCnt}, {id}], (err, result)=>{
                    console.log(result);
                    connection.destroy();
                    cb(err, result);
                });
            } else {
                cb("id not found", null);
            }
        });
    }
}

module.exports = DB;
