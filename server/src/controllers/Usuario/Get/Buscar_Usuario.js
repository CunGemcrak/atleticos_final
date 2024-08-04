const { User, Numero } = require('../../../db.js'); // Asegúrate de importar el modelo Numero
const { Op } = require('sequelize');

const BusquedaUsuario = async (req, res) => {
    const { user, pass } = req.params; // Obtenemos los datos de los parámetros de ruta
    console.log('Correo: ' + user + ', Contraseña: ' + pass);

    try {
        if (!user || !pass) {
            return res.status(400).json({ message: 'Faltan el correo o la contraseña' });
        }

        const data = await User.findOne({
            where: {
                [Op.or]: [
                    { email: user },
                    { celular: user }
                ],
                password: pass
            },
            include: [{
                model: Numero,
                through: { attributes: [] } // Esto excluye la tabla de unión de los resultados
            }]
        });

        if (data) {
            const dataValues = data.dataValues;
            const numeros = data.Numeros.map(numero => numero.dataValues.numero); // Obtén los números asociados

            const datos = {
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
                numeros // Añade los números al objeto de respuesta
            };

            console.log('Usuario encontrado:', datos);
            return res.status(200).json({ datos });
        } else {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario en la base de datos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { BusquedaUsuario };
