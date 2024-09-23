const AbstractRepository = require("./AbstractRepository");

class MemberRepository extends AbstractRepository {
  constructor() {
    super({ table: "member" });
  }

  // The C of CRUD - Create operation => CREATE NEW MEMBER AND ACCOUNT
  async create(member) {
    // CONNECTION BECAUSE DATA GOES INTO TWO TABLES
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // FIRST CONNECTION: Insert the member into the "member" table
      const [memberResult] = await connection.query(
        `INSERT INTO member (firstname, lastname, pseudo, city, postcode, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          member.firstname,
          member.lastname,
          member.pseudo,
          member.city,
          member.postcode,
          member.avatar,
        ]
      );

      const memberId = memberResult.insertId;

      // SECOND CONNECTION: Insert the account into the "account" table
      await connection.query(
        `INSERT INTO account (email, pwd, id_member_fk, assignment, date_creation) VALUES (?, ?, ?, ?, ?)`,
        [member.email, member.pwd, memberId, "user", member.date]
      );

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return memberId; // Return memberId on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  async readAllMembersInAdmin() {
    const [rows] = await this.database.query(
      `SELECT m.*, DATE_FORMAT(ac.date_creation, '%d/%m/%Y') AS date_creation, ac.email, ac.banned
      FROM member AS m
      INNER JOIN account AS ac ON id_member=id_member_fk
      ORDER BY id_member DESC`
    );
    return rows;
  }

  async readAllRanked() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} 
      INNER JOIN account AS ac ON ac.id_member_fk = member.id_member
      WHERE ac.banned = 0
      ORDER BY member.points DESC;`
    );
    return rows;
  }

  async readMember(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `SELECT ac.id_account, ac.email, ac.id_member_fk, ac.banned, m.id_member, m.firstname, m.lastname, m.pseudo, m.city, m.postcode, m.avatar, m.points
    FROM member AS m
    RIGHT JOIN account AS ac ON id_member=id_member_fk
    WHERE m.id_member=(?);`,
      [id]
    );

    return rows[0];
  }

  async updateMember(memberUpdate) {
    const connection = await this.database.getConnection();
    try {
      // Begin many operations in SQL to be executed at once or all rollback
      await connection.beginTransaction();

      // Execute the SQL UPDATE query to update a specific member
      await connection.query(
        `UPDATE ${this.table} SET city = ?, postcode = ? WHERE id_member = ?`,
        [
          memberUpdate.city,
          memberUpdate.postcode,
          memberUpdate.id,
        ]
      );
      await connection.query(
        `UPDATE account SET email = ? WHERE id_member_fk = ?`,
        [
          memberUpdate.email,
          memberUpdate.id
        ]
      );
      if (memberUpdate.pwd) {
        await connection.query(
          `UPDATE account SET pwd = ?  WHERE id_member_fk = ?`,
          [memberUpdate.pwd, memberUpdate.id]
        );
      } if (memberUpdate.picture) {
        await connection.query(
          `UPDATE member SET avatar = ? WHERE id_member = ?`,
          [memberUpdate.picture, memberUpdate.id]
        );
      }
      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return memberUpdate; // Return member on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  // ---------------------- STATISTICS ----------------------
  async readAllStatistics() {
    const connection = await this.database.getConnection();

    try {
      // Begin many operations in SQL to be executed at once or all rollback
      await connection.beginTransaction();

      // STEP 1 -- COLLECT STATISTICS FOR MEMBERS REGISTERED
      const [members] = await connection.query(
        `SELECT
    COUNT(*) AS total_registered,
    SUM(CASE WHEN WEEK(a.date_creation) = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS week_registered,
    SUM(CASE WHEN MONTH(a.date_creation) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS month_registered
    FROM member AS m
    RIGHT JOIN account AS a ON m.id_member = a.id_member_fk;`,
        []
      );

      // STEP 2 -- COLLECT STATISTICS FOR ARTWORKS REGISTERED
      const [artworks] = await connection.query(
        `SELECT
    COUNT(*) AS total_artworks,
    SUM(CASE WHEN WEEK(date_creation) = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS week_artworks,
    SUM(CASE WHEN MONTH(date_creation) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS month_artworks
    FROM artwork;`,
        []
      );

      // STEP 3 -- COLLECT STATISTICS FOR ARTWORKS COVERED
      const [covered] = await connection.query(
        `SELECT
      COUNT(*) AS total_artworks_covered
      FROM operation
      WHERE kind = 'signalement' AND id_artwork_fk IS NULL;`,
        []
      );

      const statistics = { members, artworks, covered };

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return statistics; // Return member on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }
}

module.exports = MemberRepository;
