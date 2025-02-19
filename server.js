const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'https://clubpenguin-1.onrender.com'
  }));
  app.use(express.json());

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  app.post('/enviar-email', async (req, res) => {
    const { nomePinguim, email, confirmacao } = req.body;
  
    
    const mailOptions = {
      from: 'joaopedrogundimg@gmail.com',
      to: email,
      subject: 'Confirmação de Presença',
      html: `
        <h1>BEM VINDO(A) AO CLUB PENGUIN</h1>
        <p>Olá Pinguim: ${nomePinguim}, sua confirmação de presença foi registrada como "${confirmacao}". Obrigado!</p>
        <p>Todos os direitos reservados ao Joyttape Studios c.a</p>

        <img src="https://pbs.twimg.com/media/FSRWDuIXMAAKDcB?format=jpg&name=4096x4096" alt="Imagem de boas-vindas" style="width: 500px; height: auto;">
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ message: 'Erro ao enviar e-mail.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});