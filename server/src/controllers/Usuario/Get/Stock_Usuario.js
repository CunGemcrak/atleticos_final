// Importamos el modelo Zapatos desde db.js
const { Zapatos } = require('../../../db.js');

// Definimos la función que buscará todos los zapatos en la base de datos
const BusquedaZapatosUsuario = async (req, res) => {
    try {
        // Realizamos la consulta para obtener todos los zapatos
        const data = await Zapatos.findAll({});

        // Verificamos si se obtuvieron datos
        if (data && data.length > 0) {
            console.log('Zapatos encontrados:', data);
            // Enviamos los datos en la respuesta con un estado 200
            return res.status(200).json(data);
        } else {
            console.log('No hay stock');
            // Si no hay datos, enviamos un estado 404 con un mensaje
            return res.status(404).json({ message: 'No hay Stock' });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra
        console.error('Error al buscar los zapatos en la base de datos:', error);
        // Enviamos un estado 500 con un mensaje de error
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportamos la función para que pueda ser usada en otros lugares
module.exports = { BusquedaZapatosUsuario };
