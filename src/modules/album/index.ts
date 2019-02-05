import { model, Document, Model } from 'mongoose';
import Album from './album';
import schema from './schema';

type AlbumDocument = Album & Document;

export default model<AlbumDocument>('Album', schema);