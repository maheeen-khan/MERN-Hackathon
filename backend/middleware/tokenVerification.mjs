import jwt from 'jsonwebtoken'
import 'dotenv/config.js'


const ensureAuthorized = (req, res, next) => {
    const auth = req.headers['authorization']?.split(' ')[1]
    console.log("Authorization header:", req.headers['authorization']);

    if (!auth) {
        return res.status(401).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_TOKEN)
        console.log("Secret used for JWT:", process.env.JWT_TOKEN);

        req.user = decoded
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export default ensureAuthorized