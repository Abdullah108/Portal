const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.mailtrap.io',
  port: 9000,
  auth: {
    user: 'mailingservicenode@gmail.com',
    pass: '22okhenoka',
  },
});

let mailOptions = {
  from: 'mailingservicenode@gmail.com',
  to: 'henizola@gmail.com',
  subject: 'test',
  text: 'user name: henok',
};

transporter.sendMail(mailOptions, (err, data) =>
  err
    ? console.log('something went wrong')
    : console.log('email sent')
);

// mailingservicenode@SpeechGrammarList.com
