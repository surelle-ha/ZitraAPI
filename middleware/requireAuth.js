function requireAuth(req, res, next) {
    if (req.session.user && req.session.user.id) {
      next();
    } else {
      res.redirect('/login');
    }
  }

module.exports = requireAuth