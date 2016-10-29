let db = require('./DB');
let jwt = require('jsonwebtoken');

class User extends db {
    constructor(){
        super();
    }

    Register(info, cb){
        this.Insert('User', info, (err, result)=>{
            cb(err, result);
        });
    }

    Login(info, cb){
        if(info.token){
            
        }else if(info.account && info.password){
            this._Login(info, (err, result)=>{
                if(result.length != 1){
                    err = "account or password fault";
                    cb({err}, null);
                } else{
                    let token = jwt.sign({id: result[0].id}, this.secret);
                    result = {token};
                    cb(err, result);
                }
            });
        } else {
            cb("lack of info", null);
        }
    }

    Rate(id, score, cb){
        this._Rate(id, score, (err, result)=>{
            cb(err, result);
        });   
    }

    GetRate(id, cb){
        this._GetRate(id, (result)=>{
            cb(result);
        });
    }

    GetUserInfo(token, cb){
        console.log(token);
        let parsed = jwt.verify(token, this.secret);
        let id = {id: parsed.id};
        this.Select('User', id, (err, result)=>{
            if(result.length == 1){
                let ret = result[0];
                delete ret.password;
                cb(err, ret);
            } else {
                cb({err: "wrong id"}, null);
            }
        });
    }

    Job(token, job, cb){
        job.cid = jwt.verify(token, this.secret).id;
        console.log(job);
        this.Insert('Jobs', job, (err, result)=>{
            console.log(result);
            cb(err, result);
        });
        
    }
}

module.exports = User;
