const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4, VIRTUAL, TEXT } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/players_db"
);

const Player = conn.define("player", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  bio:{
      type: TEXT,

  },
  fullName: {
    type: VIRTUAL,
    get: function () {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});

const seeder = async () => {
  await conn.sync({ force: true });

  await Promise.all(
      [
        Player.create({firstName: 'Lionel', lastName: 'Messi', bio: 'Lionel Andrés Messi, also known as Leo Messi, is an Argentine professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team.'}),
        Player.create({firstName: 'Neymar', lastName: 'Santos',  bio: 'Neymar da Silva Santos Júnior, known as Neymar, is a Brazilian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and the Brazil national team.'}),
        Player.create({firstName: 'Pedro', lastName: 'Gallese', bio: 'Pedro David Gallese Quiroz is a Peruvian professional footballer who plays as a goalkeeper for Major League Soccer club Orlando City and the Peru national team.'})
      ]
    );
};

module.exports = {
  seeder,
  Player
};
