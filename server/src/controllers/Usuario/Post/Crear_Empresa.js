const { Empresa } = require('../../../db.js');
const { Op } = require('sequelize');

const { MAIL_STILOZAP } = process.env;
const { transporter } = require('../../config/nodeMailerConfig');

const CrearEmpresa = async (req, res) => {
  const { name, celular, correo, password } = req.body;
  console.log('Este es el query: ' + JSON.stringify(req.body));

  try {
    if (!name || !correo || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const consultaUser = await Empresa.findOne({
      where: { correo } // Utilizamos la columna 'correo' en lugar de 'email'
    });

    console.log("Este es el resultado de la base de datos: " + JSON.stringify(consultaUser));

    if (consultaUser) {
      console.log('La Empresa ya existe');
      return res.status(400).json({ message: 'La empresa ya existe' });
    } else {
      console.log('Se puede almacenar');

      const [user, created] = await Empresa.findOrCreate({
        where: { correo }, // Utilizamos la columna 'correo' en lugar de 'email'
        defaults: {
          name,
          Descripcion: "",
          celular: "",
          correo,
          password,
          url: "https://res.cloudinary.com/dzb3dwute/image/upload/t_media_lib_thumb/cld-sample.jpg"
        }
      });

      if (created) {





        await transporter.sendMail({
          from: `Empresa Registrado 😊 <${MAIL_STILOZAP}>`,
          to: correo,
          subject: "Empresa Registrado  😊",
          html: `
            <h2>Nuevo Registro</h2>
            <p>Hola ${name},</p>
            <p>Te damos la bienvenida  EstiloZap mundo del zapato.  👟</strong></p>
           
            <div style="text-align: center;">
              <div style="display: inline-block; border-radius: 50%; overflow: hidden; border: 2px solid black; width: 150px; height: 150px;">
                <img src="https://firebasestorage.googleapis.com/v0/b/stylezapapp.appspot.com/o/documentos%2Fdownload.gif?alt=media&token=50b7946a-5726-40ad-ad54-f3ed4a5edcd5" alt="Imagen Aprobado" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            </div>
            <br/>
            <p style="text-align: center;">Equipo Estilo Zap web master</p>
          `,
      });
  
  













        console.log('Datos guardados correctamente');
        return res.status(200).json({ message: 'Datos guardados correctamente' });
      } else {
        return res.status(400).json({ message: 'No se puede almacenar usuario' });
      }
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { CrearEmpresa };
