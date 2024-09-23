CREATE TABLE member (
  id_member INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  firstname VARCHAR(25) NOT NULL, 
  lastname VARCHAR(25) NOT NULL, 
  pseudo VARCHAR(15) NOT NULL, 
  city VARCHAR(50) NOT NULL, 
  postcode VARCHAR(5) NOT NULL, 
  avatar TEXT NULL, 
  points INT NOT NULL DEFAULT 0
);

CREATE TABLE administrator (
  id_administrator INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  firstname VARCHAR(25) NOT NULL, 
  lastname VARCHAR(25) NOT NULL  
);

CREATE TABLE account (
  id_account INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  pwd VARCHAR(255) NOT NULL,
  assignment VARCHAR(15) NOT NULL,
  date_creation DATE NOT NULL,
  banned BOOLEAN NOT NULL DEFAULT false,
  id_member_fk INT UNSIGNED DEFAULT NULL,
  FOREIGN KEY (id_member_fk) REFERENCES member(id_member) ON DELETE SET NULL,
  id_administrator_fk INT UNSIGNED DEFAULT NULL,
  FOREIGN KEY (id_administrator_fk) REFERENCES administrator(id_administrator) ON DELETE SET NULL
);
   
CREATE TABLE artwork (
  id_artwork INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(45) NOT NULL,
  picture TEXT NOT NULL, 
  date_creation DATE NOT NULL,
  longitude DECIMAL(17, 16) NOT NULL, 
  latitude DECIMAL(16, 14) NOT NULL, 
  validate BOOLEAN NOT NULL DEFAULT false,
  reported BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE operation (
  id_operation INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  kind VARCHAR(25) NOT NULL,
  details TEXT NULL, 
  date_operation DATE NOT NULL, 
  id_account_fk INT UNSIGNED,
  FOREIGN KEY (id_account_fk) REFERENCES account(id_account) ON DELETE SET NULL,
  id_artwork_fk INT UNSIGNED,
  FOREIGN KEY (id_artwork_fk) REFERENCES artwork(id_artwork) ON DELETE SET NULL
);


