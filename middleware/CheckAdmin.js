//use only admin
module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            error : {
                message : 'Sorry! You dont have rights to use this page'
            }
        });
    }

}