const auth = require('http-auth');
const express = require('express');
const ejs = require('ejs');
const ejsLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const webhooksRouter = require('./routes/webhooks');
const apiRouter = require('./routes/api');

const app = express();
const basic = auth.basic({
  realm: 'smsutil',
  file: `${__dirname}/../data/users.htpasswd`,
});

/* public webhooks */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/webhooks', webhooksRouter);

/* auth area */
app.use(auth.connect(basic));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(ejsLayouts);
app.set('layout', 'layout');
app.use(express.static('../client/build'));
app.use(express.static('public'));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: 'uploads',
  }),
);

app.use('/api', apiRouter);
app.get('*', async (req, res) => {
  const view = await ejs.renderFile('../client/build/index.html');
  res.send(view);
});

module.exports = app;
