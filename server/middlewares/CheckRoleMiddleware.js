const checkRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user?.userRole;

  if (!userRole) {
    return res.status(401).json({
      message: 'User role is not defined.',
    });
  }

  if (allowedRoles.includes(userRole)) {
    next();
  } else {
    return res.status(403).json({
      message: 'Access denied. You do not have permission to perform this action.',
    });
  }
};
export default checkRole;
