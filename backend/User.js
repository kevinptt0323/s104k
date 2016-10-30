let db = require('./DB');
let jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

    RateJob(id, score, cb){
        this._RateJob(id, score, (err, result)=>{
            cb(err, result);
        });
    }

    GetRate(id, cb){
        this._GetRate(id, (result)=>{
            cb(result);
        });
    }

    GetJob(id, cb){
        this._GetJob(id, (result)=>{
            cb(result);
        });
    }

    GetJobRate(id, cb){
        this._GetJobRate(id, (result)=>{
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
    
    GetSingleUserInfo(id, cb){
        console.log(id);
        let uid = {id: id};
        this.Select('User', uid, (err, result)=>{
            if(result.length == 1){
                let ret = result[0];
                ret.score = ret.score/ret.scoreCnt;
                delete ret.scoreCnt;
                delete ret.password;
                cb(err, ret);
            } else {
                cb({err: "wrong id"}, null);
            }
        });
    }

    Job(token, job, cb){
        job.cid = jwt.verify(token, this.secret).id;
        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(JSON.stringify({id: job.cid, time: new Date()}));
        job.roomid = hmac.digest('hex');
        console.log(job);

        let id;
        this.Insert('Jobs', job, (err, result)=>{
            console.log(result);
            cb(err, result);
            id = result.insertId;
        });

        this.AddTag(id, job.tag, (err, result)=>{
            if(err) throw err;
            console.log(result);
        });
    };
        
    Subscribe(id, token, cb){
        let subscriberId = jwt.verify(token, this.secret);
        let userId = subscriberId.id;
        this._Subecribe( id, userId,  (err, result) => {
            cb(err, result);
        });
    }

<<<<<<< HEAD
    Feedback(message, time, cb) {
        this._Feedback(message, time, (err, result) => {
            cb(err, result);
        });
    }
    
    AddTag(jobID, tag, cb){
        tag.forEach((item) => {
            let tagID;
            this.Select(item, (err, result) => {
                if(!result[0].id){
                    this.Insert('Tag', tag, (err, result)=>{
                        cb(err, result);
                        tagID = result.insertId;                                        
                    });
                }
                else {
                    tagID = result.insertId;
                }
            });
            this.Insert('JobsTag', {jobID: jobID, tagID: tagID}, (err, result) => {
                cb(err, result);
            });
        });
    }
}

module.exports = User;
