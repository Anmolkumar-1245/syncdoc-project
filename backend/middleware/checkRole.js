module.exports = (requiredRole) => {

  return (req, res, next) => {

    const userRole = req.user.role;

    if (requiredRole === "editor") {

      if (userRole === "viewer") {
        return res.status(403).json({ message: "Access denied" });
      }

    }

    next();

  };

};