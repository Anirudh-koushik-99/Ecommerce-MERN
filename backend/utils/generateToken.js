import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    /*USING JWT TO CREATE A TOKEN*/
        /*JWT TAKES IN A payload AS FIRST PARAMETER jwt secret AS SECOND PARAMETER AND AND expiresIn ? AS THIRD ARGUMENT*/
        const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
            expiresIn: '1000d'
        });

        //Setting JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 24 *60 * 60 * 1000,
        })
}

export default generateToken;