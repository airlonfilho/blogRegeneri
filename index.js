const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 21097;

const authRoute = require('./routes/Auth')
const postRoute = require('./routes/Post')
const healthRoute = require('./routes/Health')

dotenv.config();

mongoose.connect('mongodb+srv://filhoairlon:bIDkwp5g@cluster0.3wvnoap.mongodb.net/?retryWrites=true&w=majority').then(console.log('CONNECTED TO DATABASE')
).catch((err) => console.log(err));


app.use(express.json())

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.use('/api/blog', authRoute);
app.use('/api/blog/posts', postRoute);
app.use('/', healthRoute);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => console.log('Listening on: ', PORT))
