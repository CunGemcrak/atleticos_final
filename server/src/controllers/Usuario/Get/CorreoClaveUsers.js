const { User } = require('../../../db.js');
const { MAIL_CLUB } = process.env;
const { transporter } = require('../../config/nodeMailerConfig');

const CorreoClaveUsers = async (req, res) => {
    const { email } = req.body; // Obtener el correo del cuerpo de la solicitud POST
    console.log('Buscar usuario por correo: ' + email);
    
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            const clave = user.password; // Obtener la contraseña del usuario
            const mail = user.email

            // Configurar detalles del correo
            const mailOptions = {
                from: `Verificación de Clave 🔑 <${MAIL_CLUB}>`,
                to: mail,
                subject: "Verificación de Datos 🔑",
                html: `
                  <h2>Recuperación de datos </h2>
                  <p>Hola ${user.name},</p>
                  <p>Recibimos una solicitud para recuperar tu clave. Aquí está tu clave: <strong>${clave} 🔑</strong></p>
                  <p>Si no solicitaste esta recuperación, por favor contacta a nuestro soporte.</p>
                  <div style="text-align: center;">
                    <div style="display: inline-block; border-radius: 50%; overflow: hidden; border: 2px solid black; width: 150px; height: 150px;">
                      <img src="https://firebasestorage.googleapis.com/v0/b/stylezapapp.appspot.com/o/documentos%2Fdownload.gif?alt=media&token=50b7946a-5726-40ad-ad54-f3ed4a5edcd5" alt="Imagen Aprobado" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                  </div>
                  <br/>
                  <p style="text-align: center;">Equipo Estilo Zap web master</p>
                `,
            };

            // Enviar el correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    console.log('Correo enviado: ' + info.response);
                    return res.status(200).json({ estado:true});
                }
            });

        } else {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario en la base de datos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { CorreoClaveUsers };
