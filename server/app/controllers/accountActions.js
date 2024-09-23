const tables = require("../../database/tables");

// The E of BREAD - Edit (Update) operation
const banAccountById = async (req, res, next) => {
  const accountUpdate = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.account.updateBanAccount(accountUpdate);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    // Fetch a specific account from the database based on the provided ID
    const account = await tables.account.deleteAccountWithMember(req.params.id);
    // If the account is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the account in JSON format

    res.status(200).json(account);
    // }
  } catch (err) {
    res.sendStatus(404);
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  banAccountById,
  deleteAccount,
};
