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

mongoose.connect('mongodb://institutoregeneri1:rege5254@cmongodb.institutoregeneri.com.br:27017/?retryWrites=true&w=majority').then(console.log('CONNECTED TO DATABASE')
).catch((err) => console.log(err));

app.use(express.json())
app.use('/api/blog', authRoute);
app.use('/api/blog/posts', postRoute);
app.use('/', healthRoute);
app.use('/uploads', express.static('uploads'));

const corsOptions ={
    origin:'https://institutoregeneri.com.br/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.listen(PORT, () => console.log('Listening on: ', PORT))
