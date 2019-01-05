import mongoose from 'mongoose';
import config from '../config.json';

mongoose.connect(config.mongodb);

export default mongoose;
