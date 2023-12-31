const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function (name, email, password) {

if(!email || !password || !name){
    throw Error ('all fields must be filled in')
}

if(!validator.isEmail(email)){
    throw Error ('Email is not valid')
}
if(!validator.isStrongPassword(password)){
    throw Error ('password is not strong enough')
}

 const exists = await this.findOne({ email })

 if (exists){
    throw Error ('email already in use')
 }

 const salt = await bcrypt.genSalt(10)
 const hash = await bcrypt.hash(password, salt)

 const user = await this.create({name, email, password: hash})

 return user
}

userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('all feilds must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error ('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('incorrect password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)