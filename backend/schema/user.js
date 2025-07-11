const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { generateAcessToken } = require("../auth/generateTokens");
const Token = require("../schema/token");
const getUserInfo = require("../lib/getUserInfo");

const UserSchema = new Mongoose.Schema({
    id: {type: Object},
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    name: { type: String, required: true}, 
});

UserSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew){
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash)=>{
            if(err){
                next(err);
            }else{
                document.password =hash;
                next();
            }
        })
    }else{
        next();
    }
});

UserSchema.methods.usernameExist = async function (username){
    const result = await Mongoose.model('User').findOne({username});
    return !! result;
}
UserSchema.methods.comparePassword = async function(password, hash){
    const same = await bcrypt.compare(password, hash);
    return same;
};

UserSchema.methods.createAccesToken = function (){
    return generateAcessToken(getUserInfo(this));
};
UserSchema.methods.createRefreshToken = async function (){
    const refreshToken= generateAcessToken(getUserInfo(this));
    try{
        await new Token({token: refreshToken}).save;

        return refreshToken;
    }catch(error){
        console.log(error);
    }

};

module.exports = Mongoose.model("User", UserSchema);