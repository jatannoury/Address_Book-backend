const jwt = require("jsonwebtoken");
function testMiddleware() {
  return (req, res, next) => {
    console.log(`---${req.query.id}---`); //or req.query.role to check if user or admin
    // Get token value to the json body
    const token = req.body.token;

    // If the token is present
    if (!token)
      res.status(403).json({
        message: "Not logged In",
      });
    try {
      if (token) {
        console.log("IN");

        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      }
    } catch (error) {
      res.status(401).json({
        message: "Invalid Token",
      });
    }
    next();
  };
}
module.exports = testMiddleware;
