require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
    try {
      const { pwd } = req.body;
      
      if (!pwd) {
        next();
      }

      const hashedPassword = await argon2.hash(pwd, hashingOptions);

    delete req.body.pwd;

    req.body.pwd = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // Check that the "Authorization" header is present in the request
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // // Check that the header has the form "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Check the validity of the token (its authenticity and expiry date)
    // If successful, the payload is extracted and decoded
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.status(404).json({ access: "denied" });
  }
};

const verifyProfileAccess = (req, res, next) => {
  const userId = req.auth.sub; // Assuming 'sub' is the user ID in the token payload
  const profileId = parseInt(req.params.id, 10); // Assuming the URL is /profil/:id

  if (userId !== profileId) {
    return res.status(404).json({ access: "denied" });
  }

  return next();
};

const verifyAdminAccess = (req, res, next) => {
  /* eslint-disable-next-line prefer-destructuring */
  const assignment = req.auth.assignment; // Assuming 'assingment' in the token payload

  if (assignment !== "admin") {
    return res.status(404).json({ access: "denied" });
  }

  return next();
};

const verifyResetToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const secret = process.env.APP_SECRET;
    const account = jwt.verify(token, secret);
    if (!account) {
      return res.status(400).json({ valid: false });
    }
    res.status(200).json({ valid: true });
    return next();
  } catch (error) {
    res.status(400).json({ valid: false });
    console.error("Invalid token:", error);
    return null;
  }
};

const verifyTokenRecoverPwd = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { pwd } = req.body;
    const secret = process.env.APP_SECRET;
    const payload = jwt.verify(token, secret);
    req.body = { pwd, id: payload.id };
    return next();
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  verifyProfileAccess,
  verifyAdminAccess,
  verifyResetToken,
  verifyTokenRecoverPwd,
};
