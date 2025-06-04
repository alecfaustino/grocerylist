function requireLogin(req, res, next) {
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ error: "Unauthorized: Please log in." });
  }
  next();
}

module.exports = { requireLogin };
