module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 10,
          msg: 'PhoneNumber must be 10 digits long',
        },
        is: {
          args: /^[0-9\s]+$/i,
          msg: 'Name can only contain characters',
        },
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  Contact.associate = () => {
    // associations can be defined here
  };
  return Contact;
};
