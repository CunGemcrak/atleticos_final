const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fnacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1',
    },
    tipe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1',
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'true',
    },
  }, { 
    timestamps: false,
  });
}
