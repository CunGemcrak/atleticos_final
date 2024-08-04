const { User } = require('../../../db.js');
const { Op } = require('sequelize');

const CrearUsuario = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log('Este es el query : ' + JSON.stringify(req.body));

  try {
    if (!fullName || !username || !email || !password) {
      return res.status(404).json({ message: 'Faltan datos' });
    }

    const consultaUser = await User.findOne({
      where: { email }
    });

    if (consultaUser) {
      console.log('El Usuario ya existe');
      return res.status(201).json({ state: 'falso' });
    } else {
      console.log('Se puede almacenar');

      const user = await User.create({
        nombre: fullName,
        apellido: username,
        celular: "00000000",
        email: email,  // Corregido para usar la variable correcta
        password,
        url: "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
        nivel: 'indefinido',
        tipe: "1",
        estado: 'true',
        fnacimiento: '0000/00/00'
      });

      console.log('Datos guardados correctamente');
     
      return res.status(200).json({ state: 'true' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { CrearUsuario };
