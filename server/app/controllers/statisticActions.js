const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
    try {
      // Fetch all items from the database
      const statistics = await tables.member.readAllStatistics();
  
      // Respond with the items in JSON format
      res.json(statistics);
    } catch (err) {
      // Pass any errors to the error-handling middleware
      next(err);
    }
  };

module.exports = {
  browse,
};
