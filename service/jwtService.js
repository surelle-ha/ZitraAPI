const verify = () => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.query.reg_id;
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send(verified);
        }else{
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}