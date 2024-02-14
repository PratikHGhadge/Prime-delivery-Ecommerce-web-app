function sanitizeUser(user) {
  return { id: user.id, role: user.role };
}

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

module.exports = {
  sanitizeUser: sanitizeUser,
  cookieExtractor: cookieExtractor,
};
