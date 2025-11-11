import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({
    path: "../.env"
})

function generateToken(userDetails) {
    // Accept userDetails object containing objectId, name, email, role
    // Use JWT_PRIVATE_KEY to match authMiddleware
    const token = jwt.sign(userDetails, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1d"
    })

    return token;
}

export default generateToken;