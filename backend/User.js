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

    Subscribe(token, id, cb){
        let subscriberId = jwt.verify(token, this.secret);
        this._Subecribe(id, subscriberId, (err, result) => {
            cb(err, result);
        });
    }
}

module.exports = User;
