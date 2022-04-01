module.exports = function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.prevUrl = req.url;
  res.redirect('/log-in');
};
