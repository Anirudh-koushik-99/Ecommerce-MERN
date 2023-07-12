import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'


//@desc Auth user and get token
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});
    if(user && (await user.matchPassword(password))) {
        /*USING JWT TO CREATE A TOKEN*/
        /*JWT TAKES IN A payload AS FIRST PARAMETER jwt secret AS SECOND PARAMETER AND AND expiresIn ? AS THIRD ARGUMENT*/
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1000d'
        });

        //Setting JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 24 *60 * 60 * 1000,
        })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

//@desc Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    res.send('register user');
})

//@desc Logout user / clear cookie
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async(req, res) => {
    res.send('logout user');
})

//@desc Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    res.send('get user profile');
})

//@desc Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req, res) => {
    res.send('update user profile');
})

//@desc Get all users
//@route    GET /api/users
//@access   Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send('get users');
})

//@desc Get user by ID
//@route    GET /api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    res.send('get user by ID');
})

//@desc Delete users
//@route    DELETE /api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send('delete user');
})

//@desc Update user
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    res.send('update user');
})



export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser}