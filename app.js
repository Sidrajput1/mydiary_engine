 config();
import express from 'express';
import {config} from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoute from './routes/postRoute.js';
import commentRoute from './routes/commentRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import tagRoute from './routes/tagRoute.js';
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import adminRoute from './routes/adminRoute.js';
const app = express();

app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use(
    cors({
        origin:'http://localhost:5173',
        credentials:true,
    })
)


 app.use(cookieParser());
 app.use(morgan('dev'));


app.get('/ping',(_req,res) => {
    res.send('pong');
});

app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/users',authRoutes);

app.use('/api/v1/posts',postRoute);

app.use('/api/v1/comments',commentRoute);

app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/tags',tagRoute);

app.use('/api/v1/admin',adminRoute);

// app.all('*',(_req,res)=>{
//     res.status(404).send('oops!!! 404 page not found')
// });
app.use(errorHandler);
export default app;