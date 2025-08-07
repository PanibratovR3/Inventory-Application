const { Client } = require("pg");
require("dotenv").config({ quiet: true });

const SQL = `
    CREATE TABLE IF NOT EXISTS Developer (
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        Name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Genre (
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        Name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Publisher(
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        Name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Platform(
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        Name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Game(
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        Title VARCHAR(50) NOT NULL,
        DeveloperId INTEGER NOT NULL,
        GenreId INTEGER NOT NULL,
        CONSTRAINT fk_developerId FOREIGN KEY (DeveloperId) REFERENCES Developer(Id),
        CONSTRAINT fk_genreId FOREIGN KEY (GenreId) REFERENCES Genre(Id)
    );

    CREATE TABLE IF NOT EXISTS Game_Publisher_Platform (
        Id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        GameId INTEGER NOT NULL,
        PublisherId INTEGER NOT NULL,
        PlatformId INTEGER NOT NULL,
        DateOfRelease DATE NOT NULL,
        CONSTRAINT fk_gameId FOREIGN KEY (GameId) REFERENCES Game(Id),
        CONSTRAINT fk_publisherId FOREIGN KEY (PublisherId) REFERENCES Publisher(Id),
        CONSTRAINT fk_platformId FOREIGN KEY (PlatformId) REFERENCES Platform(Id)
    );
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Finished!");
}

main();
