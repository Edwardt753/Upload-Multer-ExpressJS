module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "aca_image",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return admin;
};
