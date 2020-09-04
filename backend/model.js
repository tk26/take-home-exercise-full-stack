const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class TeamMember extends Sequelize.Model {}
TeamMember.init(
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your first name'
        },
        len: {
          args: [1, 255],
          msg: "First name should be 1 to 255 characters long"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your last name'
        },
        len: {
          args: [1, 255],
          msg: "Last name should be 1 to 255 characters long"
        }
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your title'
        },
        len: {
          args: [1, 255],
          msg: "Title should be 1 to 255 characters long"
        }
      }
    },
    story: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please tell us your story'
        },
        len: {
          args: [1, 500],
          msg: "Story should be 1 to 500 characters long"
        }
      }
    },
    favoriteColor: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: ["^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",'i'],
          msg: "Please enter your favorite color in hexadecimal"
        }
      }
    },
    photoUrl: {
      type: Sequelize.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: "Please enter a valid photo URL"
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'TeamMembers'
    // options
  }
);

module.exports = {
  sequelize,
  TeamMember
};
