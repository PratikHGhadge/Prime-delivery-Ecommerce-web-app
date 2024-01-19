function sanitizeUser(user) {
  return { id: user.id, role: user.role };
}

module.exports = {
  sanitizeUser: sanitizeUser,
};
