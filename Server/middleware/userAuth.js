import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.id){
            req.body.userId = decoded.id; 
        }
        else{
            return res.json({ success: false, message: "Token is not valid" });
        }
        next();

    } catch (error) {
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

export default userAuth;