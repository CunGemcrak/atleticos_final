const { User, Numero } = require('../../../db.js');
const { Op } = require('sequelize');

const ModificarUsuario = async (req, res) => {
  const { id } = req.params; // ID del usuario a modificar
  const { nombre, apellido, celular, email, url, nivel, tipe, estado, fnacimiento, numeros } = req.body;

  console.log("ID del usuario: " + id);

  try {
    // Verificar que exista el ID del usuario
    let usuarioExistente = await User.findByPk(id, {
      include: [{
        model: Numero,
        through: { attributes: [] } // Esto excluye la tabla de unión de los resultados
      }]
    });

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario con los datos recibidos en el body
    usuarioExistente.nombre = nombre || usuarioExistente.nombre;
    usuarioExistente.apellido = apellido || usuarioExistente.apellido;
    usuarioExistente.celular = celular || usuarioExistente.celular;
    usuarioExistente.email = email || usuarioExistente.email;
    usuarioExistente.url = url || usuarioExistente.url;
    usuarioExistente.nivel = nivel || usuarioExistente.nivel;
    usuarioExistente.tipe = tipe || usuarioExistente.tipe;
    usuarioExistente.estado = estado || usuarioExistente.estado;
    usuarioExistente.fnacimiento = fnacimiento || usuarioExistente.fnacimiento;

    // Guardar los cambios en la base de datos
    await usuarioExistente.save();

    // Actualizar los números asociados
    if (numeros && Array.isArray(numeros)) {
      await Numero.destroy({ where: { userId: id } }); // Eliminar números actuales
      const nuevosNumeros = numeros.map(numero => ({ userId: id, numero }));
      await Numero.bulkCreate(nuevosNumeros); // Crear nuevos números
    }

    // Recuperar el usuario actualizado con los números asociados
    usuarioExistente = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Numero,
        through: { attributes: [] }
      }]
    });

    // Formatear la respuesta
    const dataValues = usuarioExistente.dataValues;
    const numerosActualizados = usuarioExistente.Numeros.map(numero => numero.dataValues.numero);

    const datosActualizados = {
      idUser: dataValues.idUser,
      nombre: dataValues.nombre,
      apellido: dataValues.apellido,
      celular: dataValues.celular,
      email: dataValues.email,
      url: dataValues.url,
      nivel: dataValues.nivel,
      tipe: dataValues.tipe,
      estado: dataValues.estado,
      fnacimiento: dataValues.fnacimiento,
      numeros: numerosActualizados
    };

    console.log('Datos actualizados correctamente:', datosActualizados);

    return res.status(200).json({ data: datosActualizados });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { ModificarUsuario };
