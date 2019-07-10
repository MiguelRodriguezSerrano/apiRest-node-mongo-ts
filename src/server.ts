import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import indexRoutes from './routes/indexRoutes';
import blogRoutes from './routes/blogsRoutes';
import userRoutes from './routes/usersRoutes';

class Server {
   public app: express.Application;
    constructor() {
        this.app = express(); 
        this.config();
        this.routes();
    } 

    config() {
        
        const MONGO_URI = 'mongodb://localhost/restapi';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, /*Variable de entorno, conecta mongo a puerto por defecto*/ {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('Database is conected'));

        //Middlewares
        
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.set('port', process.env.PORT || 3000);
    }

    routes() {
       
        this.app.use(indexRoutes);
        this.app.use('/api/blogs', blogRoutes);
        this.app.use('/api/users', userRoutes);

    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
};


const server = new Server();
server.start();