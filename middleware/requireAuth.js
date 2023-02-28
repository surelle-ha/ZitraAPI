function requireAuth(req, res, next) {

  if (!req.session.user) {
    return res.send({ 
      code: '401', 
      result: 'failed', 
      return: false, 
      message: "Possible: Not Authenticated. Please login or check access token.",
      time: new Date().toLocaleString() 
    });

    next()

  }
}

module.exports = requireAuth