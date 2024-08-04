// Importamos el modelo Venta desde db.js
const { Venta } = require('../../../db.js');

// Definimos la función que buscará todas las órdenes de un usuario en la base de datos
const BuscarOrdersUsers = async (req, res) => {
    try {
        // Obtenemos el id del usuario desde los parámetros de la solicitud
        const { id } = req.params;
console.log("este es el id de la orden " + id);
        // Realizamos la consulta para obtener todas las órdenes del usuario con el id proporcionado
        const data = await Venta.findAll({
            where: { Id_Usuario : id } // Asegúrate de que 'usuarioId' sea el campo correcto en tu tabla
        });
        console.log("esto encontro "+ JSON.stringify(data));
        // Verificamos si se obtuvieron datos
        if (data && data.length > 0) {
            console.log('Ventas encontradas:', data);
            // Enviamos los datos en la respuesta con un estado 200
            return res.status(200).json(data);
        } else {
            console.log('No hay órdenes para el usuario con el id:', id);
            // Si no hay datos, enviamos un estado 404 con un mensaje
            return res.status(404).json({ message: 'No hay órdenes para este usuario' });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra
        console.error('Error al buscar las órdenes en la base de datos:', error);
        // Enviamos un estado 500 con un mensaje de error
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportamos la función para que pueda ser usada en otros lugares
module.exports = { BuscarOrdersUsers };
