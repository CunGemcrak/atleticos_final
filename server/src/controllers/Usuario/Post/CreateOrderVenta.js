const { Empresa, Venta } = require('../../../db.js');

const CreateOrderVenta = async (req, res) => {
  const { id_usuario, idmercadopago, item, preciototal, eliminar, estado } = req.body;

  try {
    // Verificar que todos los campos necesarios estén presentes
    if ( !id_usuario || !idmercadopago || !item || !preciototal || !eliminar || !estado) {
      return res.status(400).json({ message: 'Faltan datos' });
    }
   
    // Verificar si la tienda existe en la base de datos
  
    console.log("Esta es el body de la venta "+ JSON.stringify(req.body));
 
    // Crear o encontrar la venta
    const [venta, created] = await Venta.findOrCreate({
      where: { idmercadopago }, // Aseguramos que la venta no se duplique basada en idmercadopago
      defaults: {
        id_usuario,
        idmercadopago,
        item,
        preciototal,
        eliminar,
        estado
      }
    });

    if (created) {
      console.log('Datos guardados correctamente');
      return res.status(201).json({ venta });
    } else {
      return res.status(400).json({ message: 'La venta ya existe' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { CreateOrderVenta };
