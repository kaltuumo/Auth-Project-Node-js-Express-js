const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
require('dotenv').config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);   
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send({message:'Hello From The serversssss!'});
});

// Default to port 8000 if process.env.PORT is not defined
const port = process.env.PORT || 7001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
