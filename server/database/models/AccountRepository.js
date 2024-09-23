const AbstractRepository = require("./AbstractRepository");

class AccountRepository extends AbstractRepository {
  constructor() {
    super({ table: "account" });
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT *
        FROM ${this.table}
        WHERE email=(?);`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async updateBanAccount(accountUpdate) {
    // Execute the SQL UPDATE query to update a specific category
    const [result] = await this.database.query(
      `UPDATE ${this.table} INNER JOIN member ON ${this.table}.id_member_fk = member.id_member
      SET ${this.table}.banned = 1
      WHERE member.id_member = ?`,
      [accountUpdate.id]
    );

    return result.affectedRows;
  }

  async deleteAccountWithMember(id) {
    const connection = await this.database.getConnection();

    try {
      // Begin the transaction
      await connection.beginTransaction();

      // FIRST CONNECTION : DELETE ACCOUNT
      await connection.query(
        `DELETE FROM account WHERE id_member_fk = ?;`,
        [id]
      );

      // SECOND CONNECTION : DELETE MEMBER
      await connection.query(`DELETE FROM member WHERE id_member = ?;`, [id]);

      // Commit the transaction
      await connection.commit();
      return { success: true, message: "Account/member deleted successfully." };
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      // Release the connection
      connection.release();
    }
  }


  async verifyEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT a.email, a.id_account, a.id_member_fk, m.firstname, m.pseudo
        FROM ${this.table} AS a
        INNER JOIN member AS m ON id_member=id_member_fk
        WHERE a.email=(?);`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async editPwd(account) {
    // Execute the SQL UPDATE query to update the password
    const [result] = await this.database.query(
      `update ${this.table} set pwd = ? where id_account = ?`,
      [account.pwd, account.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = AccountRepository;
