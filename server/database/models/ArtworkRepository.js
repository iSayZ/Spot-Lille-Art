const AbstractRepository = require("./AbstractRepository");

class ArtworkRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "artwork" as configuration
    super({ table: "artwork" });
  }

  // The C of CRUD - Create operation
  async create(artwork) {
    // CONNECTION BECAUSE DATA GOES INTO TWO TABLES
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // FIRST CONNECTION: Insert the member into the "artwork" table
      const [artworkResult] = await connection.query(
        `insert into ${this.table} (title, picture, date_creation, longitude, latitude) values (?, ?, ?, ?, ?)`,
        [
          artwork.title,
          artwork.picture,
          artwork.date_creation,
          artwork.longitude,
          artwork.latitude,
        ]
      );

      const artworkId = artworkResult.insertId;

      // SECOND CONNECTION: Insert the account into the "operation" table
      await connection.query(
        `INSERT INTO operation (kind, details, date_operation, id_account_fk, id_artwork_fk) VALUES (?, ?, ?, ?, ?)`,
        [
          "ajout",
          "Nouvelle oeuvre",
          artwork.date_creation,
          artwork.id_account_fk,
          artworkId,
        ]
      );

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return artworkId; // Return artworkId on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `SELECT a.*, DATE_FORMAT(a.date_creation, '%d-%m-%Y') AS date_creation, m.pseudo, m.points, m.avatar
      FROM artwork AS a
      INNER JOIN operation AS o ON id_artwork_fk=id_artwork
      INNER JOIN account AS ac ON id_account=id_account_fk
      INNER JOIN member AS m ON id_member=id_member_fk
      WHERE id_artwork=(?);`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
  }

  // The Rs of CRUD - Read operations
  async readAll() {
    // Execute the SQL SELECT query to retrieve all artworks from the "artwork" table
    const [rows] = await this.database.query(
      `SELECT id_artwork, title, picture, DATE_FORMAT(date_creation, '%d-%m-%Y') AS formatted_date, longitude, latitude, validate
      FROM ${this.table} 
      WHERE validate = true 
      ORDER BY date_creation DESC`
    );

    // Return the array of items
    return rows;
  }

  async readAllArtworksNotValidate() {
    // Execute the SQL SELECT query to retrieve all artworks from the "artwork" table
    const [rows] = await this.database.query(
      `SELECT id_artwork, title, picture, DATE_FORMAT(date_creation, '%d-%m-%Y') AS formatted_date, longitude, latitude, validate
      FROM ${this.table} 
      WHERE validate = false 
      ORDER BY date_creation DESC`
    );

    // Return the array of artworks not validate
    return rows;
  }

  async readArtworksNotValidate(id) {
    // Execute the SQL SELECT query to retrieve a specific artwork by its ID
    const [rows] = await this.database.query(
      `SELECT a.*, DATE_FORMAT(a.date_creation, '%d/%m/%Y') AS date_creation, m.pseudo, m.points, m.id_member, ac.id_account
      FROM artwork AS a
      INNER JOIN operation AS o ON id_artwork_fk=id_artwork
      INNER JOIN account AS ac ON id_account=id_account_fk
      INNER JOIN member AS m ON id_member=id_member_fk
      WHERE validate = false AND id_artwork=(?);`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
  }

  async readAllMemberArtwork(id) {
    // Execute the SQL SELECT query to retrieve all artworks from the account
    const [rows] = await this.database.query(
      `SELECT a.id_artwork, a.title, a.picture, DATE_FORMAT(a.date_creation, '%d/%m/%Y') AS date_creation, a.validate, o.id_operation, o.date_operation, o.id_account_fk, o.id_artwork_fk, ac.id_member_fk
    FROM artwork AS a
    INNER JOIN operation AS o ON id_artwork_fk=id_artwork
    INNER JOIN account AS ac ON id_account=id_account_fk
    WHERE ac.id_member_fk=(?) AND o.kind = "ajout"
    ORDER BY a.id_artwork DESC;`,
      [id]
    );

    return rows;
  }

  async reportArtwork(id, dateOperationReport, idAccountFk, idArtwork) {
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // FIRST CONNECTION: Insert the member into the "artwork" table
      const [artworkReport] = await connection.query(
        `UPDATE artwork SET reported = ? WHERE id_artwork = ?`,
        [1, id]
      );

      const artworkReported = artworkReport.insertId;

      const formattedDateOperationReport = new Date(dateOperationReport)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // SECOND CONNECTION: Insert the account into the "operation" table
      await connection.query(
        `INSERT INTO operation (kind, details, date_operation, id_account_fk, id_artwork_fk) VALUES (?, ?, ?, ?, ?)`,
        [
          "signalement",
          "Oeuvre signalée",
          formattedDateOperationReport,
          idAccountFk,
          idArtwork,
        ]
      );

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return artworkReported; // Return artworkId on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  async validateArtwork(id, dateOperation, idAccount, idMember) {
    const connection = await this.database.getConnection();

    try {
      // Begin the transaction
      await connection.beginTransaction();

      // FIRST CONNECTION : VALIDATE THE ARTWORK
      await connection.query(
        `UPDATE artwork SET validate = ? WHERE id_artwork = ?`,
        [1, id]
      );

      const formattedDateOperation = new Date(dateOperation)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // SECOND CONNECTION : INSERT THE OPERATION
      await connection.query(
        `INSERT INTO operation (kind, details, date_operation, id_account_fk, id_artwork_fk) VALUES (?, ?, ?, ?, ?)`,
        ["validation", "oeuvre validée", formattedDateOperation, idAccount, id]
      );

      // THIRD CONNECTION : ADD POINTS
      await connection.query(
        `UPDATE member
        SET points = points + ?
        WHERE id_member = ?`,
        [5, idMember]
      );

      // Commit the transaction
      await connection.commit();
      return { success: true, message: "Artwork validated successfully." };
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      // Release the connection
      connection.release();
    }
  }

  async denyArtwork(id) {
    // DELETE THE ARTWORK
    const [rows] = await this.database.query(
      `DELETE FROM artwork WHERE id_artwork = ?;`,
      [id]
    );

    return rows[0];
  }

  async readAllArtworksReported() {
    // GET ARTWORKS REPORTED
    // Execute the SQL SELECT query to retrieve all artworks from the "artwork" table
    const [rows] = await this.database.query(
      `SELECT id_artwork, title, picture, DATE_FORMAT(date_creation, '%d-%m-%Y') AS formatted_date, longitude, latitude, validate, reported
    FROM ${this.table} 
    WHERE reported = true 
    ORDER BY date_creation DESC`
    );

    // Return the array of artworks not validate
    return rows;
  }

  async readArtworksReported(id) {
    // Execute the SQL SELECT query to retrieve a specific artwork by its ID
    const [rows] = await this.database.query(
      `SELECT a.*, DATE_FORMAT(a.date_creation, '%d/%m/%Y') AS date_creation, m.pseudo, m.points, m.id_member, ac.id_account
      FROM artwork AS a
      INNER JOIN operation AS o ON id_artwork_fk=id_artwork
      INNER JOIN account AS ac ON id_account=id_account_fk
      INNER JOIN member AS m ON id_member=id_member_fk
      WHERE reported = true AND id_artwork=(?);`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
  }

  async keepArtworkReported(id) {
    const [rows] = await this.database.query(
      `UPDATE artwork SET reported = ? WHERE id_artwork = ?`,
      [false, id]
    );

    // Return the array of artworks reported that are now not reported
    return rows;
  }

  async deleteArtworkReported(id) {
    const connection = await this.database.getConnection();

    try {
      // Begin the transaction
      await connection.beginTransaction();

      // COMMENT RÉCUPÉRER L'OPÉRATION ET DONC L'ID DE L'ACCOUNT À L'ORIGINE DU SIGNALEMENT ?????
      // FIRST CONNECTION : ADD POINTS
      await connection.query(
        `UPDATE member AS m
        INNER JOIN account AS ac ON m.id_member=ac.id_member_fk
        INNER JOIN operation AS o ON o.id_account_fk=ac.id_account
        SET m.points = points + ?
        WHERE o.id_artwork_fk = ? AND o.kind = "signalement"`,
        [3, id]
      );

      // SECOND CONNECTION : VALIDATE THE ARTWORK
      await connection.query(`DELETE FROM artwork WHERE id_artwork = ?;`, [id]);

      // Commit the transaction
      await connection.commit();
      return { success: true, message: "Artwork validated successfully." };
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      // Release the connection
      connection.release();
    }
  }
}

module.exports = ArtworkRepository;
