module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      allowNull: false,
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
    encrypted_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Contact, {
      as: 'contacts',
      foreignKey: 'userId',
    });
  };
  return User;
};
