import * as Bull from 'bull';
import getAlbumsForYear from './getAlbumsForYear';
import getAlbumDetails from './getAlbumDetails';

export default function() {
  const Queue = new Bull('rym', {
    limiter: {
      max: 20,
      duration: 1000*60*30
    }
  });
  
  Queue.process('getAlbumsForYear', getAlbumsForYear(Queue));
  Queue.process('getAlbumDetails', getAlbumDetails);

  return Queue;
};