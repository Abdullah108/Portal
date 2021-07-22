const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const multer = require('multer');

const mongoose = require('mongoose');
////////////////////////////////////////////////////////////////
// const { auth } = require('./authentication');
const { admin, editor } = require('./super');
////////////////////////////////////////////////////////////////
// var userModel = mongoose.model('portalusers');
const PortalDocs = new mongoose.model(
  'PortalDocs',
  new mongoose.Schema({
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
      default: 'Client Submitted Document ',
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
  })
);

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

app.post(
  '/submmit',
  upload.single('doc'),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .send('No file please Upload file');
    }

    const doc = new PortalDocs({
      doc: req.file.filename,
      workDesierd: req.body.workDesierd,
      docName: req.body.docName,
      userName: req.body.userName,
      pages: `document size = ${req.body.pages} pages`,
    });
    let docs = [];
    const result = await doc.save();

    res.send(result);
  }
);

app.post('/change-status', async (req, res) => {
  console.log(req.body.id);
  // const doc = new PortalDocs({
  //   doc: req.file.filename,
  //   workDesierd: req.body.workDesierd,
  //   docName: req.body.docName,
  //   userName: req.body.userName,
  //   pages: `document size = ${req.body.pages} pages`,
  // });
  // let docs = [];
  // const result = await doc.save();

  // res.send(result);
});

app.post(
  '/edit-feature-ad',
  editor,
  upload.single('adFeatureImage'),
  async (req, res) => {
    console.log('inside ', req.user);
    if (!req.file || !req.body.oldFeatureImage) {
      return res.status(400).send('bad request');
    }

    const file = path.join(
      __dirname,
      '..',
      'ads',
      req.body.oldFeatureImage
    );
    console.log('test', req.file);

    const feature = await PortalDocs.updateOne({
      $set: { doc: req.file.filename },
    });
    if (feature.nModified) {
      fs.unlink(file, (err) => {
        if (err) res.status(500).send(err);
        else {
          return res.send(feature);
        }
      });
      // res.send(feature);
    } else {
      res.send(feature);
    }
  }
);

app.post(
  '/delete-feature-ad',
  editor,
  async (req, res) => {
    if (!req.body.oldFeatureImage) {
      return res.status(400).send('bad request');
    }
    const file = path.join(
      __dirname,
      '..',
      'ads',
      req.body.oldFeatureImage
    );
    const feature = await PortalDocs.deleteOne();
    if (feature.n) {
      fs.unlink(file, (err) => {
        if (err) res.status(500).send(err);
        else {
          return res.send(feature);
        }
      });
    } else {
      res.send('Unable to delete');
    }
  }
);

// adds////////////////////////////////////////////////////////////////////////////////////
app.post(
  '/ad',
  editor,
  upload.single('adImage'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send('bad request');
    }
    const ad = new PortalDoc({
      ad: req.file.filename,
    });
    const result = await ad.save();
    res.send(result);
  }
);

app.post('/get-ads', async (req, res) => {
  const ad = await PortalDoc.find();
  console.log(
    'sendingggggggggggggggggggggggggggg'
  );
  res.status(200).send(ad);
});

app.post(
  '/edit-ad',
  editor,
  upload.single('newAdImage'),
  async (req, res) => {
    if (
      !req.file ||
      !req.body.id ||
      !req.body.oldFeatureImage
    ) {
      return res.status(400).send('bad request');
    }
    const ad = await PortalDoc.findOne({
      _id: req.body.id,
    });
    console.log(ad);
    const file = path.join(
      __dirname,
      '..',
      'ads',
      ad.Ad
    );
    const feature = await PortalDoc.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: { Ad: req.file.filename },
      }
    );
    if (feature.nModified) {
      fs.unlink(file, (err) => {
        if (err) res.status(500).send(err);
        else {
          return res.send(feature);
        }
      });
      // res.send(feature);
    } else {
      res.send(feature);
    }
  }
);

app.post(
  '/delete-ad',
  editor,
  async (req, res) => {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).send('bad request');
    }
    const ad = await PortalDoc.findOne({
      _id: req.body.id,
    });

    if (ad) {
      const file = path.join(
        __dirname,
        '..',
        'ads',
        ad.ad
      );
      const feature = await PortalDoc.deleteOne({
        _id: req.body.id,
      });
      if (feature.n) {
        fs.unlink(file, (err) => {
          if (err) res.status(500).send(err);
          else {
            return res.send(feature);
          }
        });
      } else {
        res.send('Unable to delete');
      }
    } else {
      res.send('file not found');
    }
  }
);

module.exports = app;
