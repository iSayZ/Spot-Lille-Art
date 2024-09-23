// Import access to database tables
require('dotenv').config();
const argon2 = require("argon2")
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const account = await tables.account.readByEmail(req.body.email);
    
    if (!account) {
      return res.status(400).json({ message: "Votre adresse mail ou votre mot de passe est incorrect." });
    }

    const verified = await argon2.verify(account.pwd, req.body.pwd);

    if (!verified) {
      return res.status(400).json({ message: "Votre adresse mail ou votre mot de passe est incorrect." });
    }

    if(account.banned) {
      return res.status(400).json({ message: "Votre compte a été banni." })
    }
    
    // Respond with the user in JSON format (but without the hashed password)
    delete account.pwd;
    
    const token = jwt.sign(
      // PAYLOAD
      { sub: account.id_member_fk ? account.id_member_fk : account.id_administrator_fk, assignment: account.assignment },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      account,
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    return next(err);
  }
};


// Recover Password
const generateResetPwdToken = async (req, res, next) => {
  try {
    // Checks that the email entered exists
    const account = await tables.account.verifyEmail(req.body.email);
    if (account) {
      const payload = { id: account.id_account };
      const secret = process.env.APP_SECRET; 
      const options = { expiresIn: '1h' }; 
    
      req.body = {to: account.email, name: account.firstname, token: jwt.sign(payload, secret, options)};

      res.status(200).json({ message: `Un e-mail de récupération vous a été envoyé à l'adresse : ${req.body.to}.` });
    } else {
      res.status(404).json({ message: `L'adresse e-mail : ${req.body.email} n'est associée à aucun compte.` });
    }
      return next();
  } catch (error) {
    return next(error)
  }
};


const changePwd = async (req, res, next) => {
  // Extract the pwd data from the request body
  const account = req.body;

  try {
    // Update the pwd in the database
    await tables.account.editPwd(account);

    // Respond with HTTP 204 (No Content)
    res.status(200).json({ message: `Votre mot de passe a été modifié.` });
    next()
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(404).json({ message: `Votre mot de passe n'a pas pu être modifié, veuillez contacter le`});
  }
};

module.exports = {
  login,
  generateResetPwdToken,
  changePwd
};
