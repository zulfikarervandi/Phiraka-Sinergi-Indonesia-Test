function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "required-captcha":
      code = 400;
      message = "Captcha is required";
      break;
    case "invalid-credentials":
      code = 401;
      message = "Invalid username or password";
      break;
    case  "required-username":
      code = 400;
      message = "Username is required"
      break;
    case "required-password":
      code = 400;
      message = "Password is required";
      break;    
    case "user-not-found":
      code = 404;
      message = "User not found";
      break;
    default:
      code = 500;
      message = "Internal server error";
      break;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
