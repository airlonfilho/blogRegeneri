const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3001;

const authRoute = require('./routes/Auth')
const postRoute = require('./routes/Post')
const healthRoute = require('./routes/Health')

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(console.log('CONNECTED TO DATABASE')
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
