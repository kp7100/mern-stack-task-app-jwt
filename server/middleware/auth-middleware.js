//to check if user is validated or not when a reload takes place

const jwt = require('jsonwebtoken')
const user = require("../models/user")

const userAuthVerification = async(req, res) =>{
    const token = req.cookies.token
    if(!token){
        res.json({
            success : false,
            message : "Token not available"
        })
    }
    if(token){
        try {
            const decoded = jwt.verify(token, 'DEFAULT_SECRET_KEY')
            const userInfo = await user.findById(decoded.getId)
            if(userInfo){
                return res.status(200).json({
                    success : true,
                    userInfo
                })
            }

        } catch (error) {
            return res.json({
                success : false,
                message : "User not authenticated"
            })
        }
    }
}

module.exports = {userAuthVerification}