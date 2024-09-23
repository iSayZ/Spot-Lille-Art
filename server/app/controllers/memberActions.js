const Joi = require("joi");
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseMembersInAdmin = async (req, res, next) => {
  try {
    const members = await tables.member.readAllMembersInAdmin();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

const browseRanking = async (req, res, next) => {
  try {
    const members = await tables.member.readAllRanked();
    res.json(members);
  } catch (err) {
    next(err);
  }
};

const browseMemberById = async (req, res, next) => {
  try {
    // Fetch a specific category from the database based on the provided ID
    const member = await tables.member.readMember(req.params.id);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (member == null) {
      res.sendStatus(404);
    } else if (member.banned) {
      res.status(403).json("banned");
    } else {
      res.status(200).json(member);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const createMember = async (req, res, next) => {
  const formSchema = Joi.object({
    firstname: Joi.string().max(25).required(),
    lastname: Joi.string().max(25).required(),
    pseudo: Joi.string().max(15).required(),
    city: Joi.string().max(50).required(),
    postcode: Joi.string()
      .pattern(/^[0-9]{5}$/)
      .required(),
    email: Joi.string().email().max(100).required(),
    pwd: Joi.string().max(255).required(),
    date: Joi.date().required(),
    avatar: Joi.string().max(255).required(),
  });

  const filteredBody = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pseudo: req.body.pseudo,
    city: req.body.city,
    postcode: req.body.postcode,
    email: req.body.email,
    pwd: req.body.pwd,
    date: req.body.date,
    avatar: req.body.avatar,
  };

  try {
    // CHECK THE DATA WITH JOI
    const { error, value } = formSchema.validate(filteredBody);

    // IF ERROR
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // IF DATA ARE OK, CREATE THE MEMBER
    const insertId = await tables.member.create(value);

    // RETURN SUCCESS RESPONSE
    return res.status(201).json({ insertId });
  } catch (err) {
    // PASS ERROR TO EXPRESS ERROR HANDLER
    return next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const editMemberById = async (req, res, next) => {
  const memberUpdate = { ...req.body, id: req.params.id };
  
  try {
    // Update the category in the database
    await tables.member.updateMember(memberUpdate);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browseMembersInAdmin,
  browseRanking,
  browseMemberById,
  createMember,
  editMemberById,
};
