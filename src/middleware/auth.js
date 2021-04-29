//Middleware , usado para comprobar la autenticación de usuario.
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ 
            status:403,
            message: 'No Autorizado'})
    }
    if (req.headers.authorization == process.env.API_KEY) {
        next()
    }else{
        return res.status(403).send({ 
            status:403,
            message: 'No Autorizado'})
    }
}
    
module.exports = isAuth