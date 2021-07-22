const express = require('express');

const app = express();

const Joi = require('joi');

const mongoose = require('mongoose');

const fs = require('fs');

const multer = require('multer');

var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const path = require('path');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailer.henok@gmail.com',
    pass: '22okhenoka',
  },
});

app.use(express.json());
const PortalUsers = new mongoose.model(
  'PortalUsers',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      default: 'client',
    },
    userName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postal: {
      type: String,
      required: true,
    },
    // submitted: {
    //   type: Number,
    //   required: true,
    // },
    // inProgress: {
    //   type: Number,
    //   required: true,
    // },
    // completed: {
    //   type: Number,
    //   required: true,
    // },
    // approved: {
    //   type: Number,
    //   required: true,
    // },
    documents: [
      {
        doc: {
          type: String,
          required: true,
        },
        docName: {
          type: String,
          required: true,
        },
        workDesierd: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: new Date().toDateString(),
        },
        status: {
          type: String,
          default: 'submitted',
          required: true,
        },
        pages: {
          type: String,
          required: true,
        },
      },
    ],
  })
);

const cilentSchema = Joi.object({
  email: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(8),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postal: Joi.string().required(),
  country: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string(),
});

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, '..', 'docs'));
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/register-client', async (req, res) => {
  let { error } = cilentSchema.validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  }

  let found = false;
  const clientcheck = await PortalUsers.find();
  clientcheck.forEach((ad) => {
    if (
      ad.email === req.body.email ||
      ad.userName === req.body.userName
    ) {
      found = true;
      return;
    }
  });

  if (found)
    return res
      .status(500)
      .send('email or username taken');

  const salt = await bcrypt.genSalt(5);
  let password = req.body.password;
  password = await bcrypt.hash(password, salt);

  const client = new PortalUsers({
    email: req.body.email,
    password: password,
    userName: req.body.userName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    postal: req.body.postal,
    phone: req.body.phone,
    role: req.body.role && req.body.role,
    documents: [],
  });

  var mailOptions = {
    from: 'nodemailer.henok@gmail.com',
    to: req.body.email,
    subject: 'Account created',
    text: `your Portal account has been created your default password is 12345678 you can log in using your provided email`,
  };

  transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          'Email sent: ' + info.response
        );
      }
    }
  );

  const result = await client.save();
  res.status(200).send(result);
});

app.post('/get-clients', async (req, res) => {
  const clients = await PortalUsers.find({
    role: 'client',
  });

  res.send(clients);
});
app.post('/get-user', async (req, res) => {
  const clients = await PortalUsers.findOne({
    _id: req.body.id,
  });

  res.send(clients);
});
app.post('/sign-in', async (req, res) => {
  const user = await PortalUsers.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res
      .status(400)
      .send('user name or password not correct');
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (validPassword) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    const resp = {
      token: token,
      role: user.role,
      id: user._id,
      userName: user.userName,
    };
    res.send(resp);
  } else {
    res
      .status(500)
      .send('user name or password not correct');
  }
});

app.post('/get-docs', async (req, res) => {
  const user = await PortalUsers.findOne({
    _id: req.body.id,
  });

  res.send(user.documents);
});
app.post(
  '/submit-doc',
  upload.single('doc'),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .send('No file please Upload file');
    }
    let user = await PortalUsers.findOne({
      _id: req.body.id,
    });

    let docs = await PortalUsers.updateOne(
      {
        _id: req.body.id,
      },
      {
        $push: {
          documents: {
            doc: req.file.filename,
            workDesierd: req.body.workDesierd,
            docName: req.body.docName,
            userName: req.body.userName,
            pages: `document size = ${req.body.pages} pages`,
          },
        },
      }
    );

    var mailOptions = {
      from: 'nodemailer.henok@gmail.com',
      to: 'z.w.henok@gmail.com',
      subject: `user ${user.userName} subbmitted a document`,
      text: `${user.userName} just subbmitted  ${req.body.pages} pages of document `,
    };

    transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            'Email sent: ' + info.response
          );
        }
      }
    );

    res.send(docs);
  }
);

app.post('/get-docs', async (req, res) => {
  const result = await PortalDocs.findOne({
    _id: req.body.id,
  });

  res.send(result.documents);
});

app.post('/change-status', async (req, res) => {
  console.log(
    req.body.vid_id,
    'and',
    req.body.user_id
  );
  let user = await PortalUsers.findOne({
    _id: req.body.user_id,
  });

  let oldStatus = await PortalUsers.updateOne(
    {
      _id: req.body.user_id,
      'documents._id': req.body.vid_id,
    },
    {
      $set: {
        'documents.$.status': req.body.status,
      },
    }
  );
  var mailOptions = {
    from: 'nodemailer.henok@gmail.com',
    to: 'z.w.henok@gmail.com',
    subject: `Document status update `,
    text: `dear ${user.userName} your document  has progressed to status of ${req.body.status} `,
  };

  transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          'Email sent: ' + info.response
        );
      }
    }
  );
});

module.exports = app;

// app.post(
//   '/change-video',
//   editor,
//   cpUpload,
//   async (req, res) => {
//     const file = path.join(
//       __dirname,
//       '..',
//       'uploads',
//       req.body.vidUrl
//     );
//     let oldDailyShow =
//       await HagereDailyShows.updateOne(
//         {
//           _id: req.body.tvId,
//           'videos._id': req.body.videoId,
//         },
//         {
//             {
//             'videos.$.url': req.files.video
//               ? req.files.video[0].filename
//               : req.body.vidUrl,
//             'videos.$.videoTitleAm':
//               req.body.videoTitleAm,
//             'videos.$.videoTitleEn':
//               req.body.videoTitleEn,
//             // videos: { _id: req.body.videoId },
//           },
//         }
//       );

//     if (oldDailyShow.nModified) {
//       fs.unlink(file, (err) => {
//         if (err) res.status(500).send(err);
//         else {
//           console.log('deleted');
//           res.send(oldDailyShow);
//         }
//       });
//     } else {
//       res.status(500).send('video not found');
//     }
//   }
// );
