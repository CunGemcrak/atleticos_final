const { Empresa, Venta } = require('../../../db.js');

const CrearCompra = async (req, res) => {
  const { tienda, idmercadopago, item, preciototal, eliminar, activo } = req.body;

  try {
    // Validación de datos faltantes
    if (!tienda || !idmercadopago || !item || !preciototal || eliminar === undefined || activo === undefined) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const consultaUser = await Empresa.findOne({ where: { id: tienda } });

    if (consultaUser) {
      console.log('El Usuario ya existe');
      const [user, created] = await Venta.findOrCreate({
      
        defaults: { tienda, idmercadopago, item, preciototal, eliminar, activo }
      });

      if (created) {
        console.log('Datos guardados correctamente');
        return res.status(200).json({ message: 'Venta creada exitosamente' });
      } else {
        console.log('La venta ya existe');
        return res.status(409).json({ message: 'La venta ya existe' });
      }
    } else {
      console.log('La tienda no existe');
      return res.status(404).json({ message: 'La tienda no existe' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { CrearCompra };
