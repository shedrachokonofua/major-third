import RateYourMusicQueue from '../../queues/rym/index';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import Arena from 'bull-arena';
import startUI from './startUI';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
const Queue = RateYourMusicQueue();
startUI();