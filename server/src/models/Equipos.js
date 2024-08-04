const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Equipo = sequelize.define('Equipo', {
    idEquipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreEquipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'true',
    },
  }, { 
    timestamps: false,
  });
}
/*
  // Sincronización y carga inicial de datos
  User.sync().then(() => {
    return User.bulkCreate([
      { name: 'Luis', apell: 'Buelvas', celular: '3012282338', email: 'labc.1021@gmail.com', password: 'geminis', url: 'https://firebasestorage.googleapis.com/v0/b/stylezapapp.appspot.com/o/documentos%2Fthumb-1920-1010687.jpg?alt=media&token=7b366209-2deb-4b24-9eeb-b45c936ec7b2', tipe: '1', state: 'true' },
      // Agrega más usuarios si es necesario
    ]);
  }).catch(err => {
    console.error('Error en la sincronización de User:', err);
  });

  return User; // Devuelve el modelo User al final del archivo
};
*/