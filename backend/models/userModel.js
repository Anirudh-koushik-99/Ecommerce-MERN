import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//ENCRYPT THE PASSWORD GIVEN BY USER IN FRONT END BEFORE REGISTERING THE USER
// The pre() method performs the action before saving the password to DB
//The post() method performs the action after 
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User",  userSchema);

export default User