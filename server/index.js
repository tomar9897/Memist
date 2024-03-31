import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// routes
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import UploadRoute from './routes/UploadRoute.js';
import ChatRoute from './routes/ChatRoute.js';
import MessageRoute from './routes/MessageRoute.js';
import AdminRoute from './routes/AdminRoute.js';
import trendingRoutes from './routes/trendingRoute.js';


const app = express();

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

dotenv.config();
const PORT = process.env.PORT;

// Set the strictQuery option to false to prepare for Mongoose 7
// mongoose.set('strictQuery', false);

const CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
    .connect(CONNECTION, { useNewUrlParser: false, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
app.use('/admin', AdminRoute);
app.use('/trending', trendingRoutes);