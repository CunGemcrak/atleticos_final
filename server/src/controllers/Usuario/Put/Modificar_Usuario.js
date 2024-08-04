const { User } = require('../../../db.js');
const { Op } = require('sequelize');

const ModificarUsuario = async (req, res) => {
  const { id } = req.params; // ID del usuario a modificar
  const { name, apell, celular, email, url } = req.body;
console.log("este es el usuariio " + id );
  try {
    // Verificar que exista el ID del usuario
    let usuarioExistente = await User.findByPk(id);

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario con los datos recibidos en el body
    usuarioExistente.name = name;
    usuarioExistente.apell = apell;
    usuarioExistente.celular = celular;
    usuarioExistente.email = email;
    usuarioExistente.url = url;

    // Guardar los cambios en la base de datos
    await usuarioExistente.save();

    // Recuperar el usuario actualizado excluyendo el campo de contraseña
    usuarioExistente = await User.findByPk(id, { attributes: { exclude: ['password'] } });

    console.log('Datos actualizados correctamente');

    return res.status(200).json({ data:usuarioExistente });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { ModificarUsuario };
