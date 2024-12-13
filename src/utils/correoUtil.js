const nodemailer = require('nodemailer');
const fs = require('fs');

const enviarCorreo = async ({ destinatario, asunto, texto, adjuntos }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dentizsystem@gmail.com',
            pass: 'lnexynrfgqzpuxdk',
        },
    });

    const mailOptions = {
        from: '"Dentiz" <dentizsystem@gmail.com>',
        to: destinatario,
        subject: asunto,
        text: texto,
        attachments: adjuntos, 
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar correo:', error.message);
        throw error;
    }
};

module.exports = { enviarCorreo };
