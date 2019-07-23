import mongoose from 'mongoose';
import databaseConfig from '../config/database.config';


mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);

export default () => { return mongoose.connect(databaseConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log('successfully connected to database');
    }).catch(error => console.log(error));
}