import RateYourMusicQueue from '../../queues/rym/index';
const Queue = RateYourMusicQueue();

for(let year = 1968; year <= 2018; year++) {
  for(let page = 1; page <= 10; page++) {
    Queue.add('getAlbumsForYear', { year, page });
  }
}