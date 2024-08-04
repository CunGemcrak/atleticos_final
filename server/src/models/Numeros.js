const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Numero = sequelize.define('Numero', {
    idnumero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false
      }

  }, { 
    timestamps: false,
  });

  Numero.sync({ force: true }).then(() => {
    // Crear un array con los números del 1 al 99
    const numeros = [];
    for (let i = 0; i <= 99; i++) {
        if(i<10){
            numeros.push({ numero: '0'+i }); 
        }else{

            numeros.push({ numero: i });
        }
     
    }

    // Insertar los números en la tabla
    return Numero.bulkCreate(numeros);
  }).then(() => {
    console.log('Los números del 1 al 99 han sido insertados en la tabla.');
  }).catch(err => {
    console.error('Error en la sincronización de Numero:', err);
  });

  return Numero;
};