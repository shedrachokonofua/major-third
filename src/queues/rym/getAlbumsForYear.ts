import getChart from "../../crawlers/rym/getChart";
import Album from "../../modules/album/index";

export default function(queue) {
  console.log('Task binded.');
  return Task.bind({ queue });
}

async function Task(job) {
  const { year, page = 1 } = job.data;
  if(year < 1968 || year > 2018) {
    throw new Error('Year must be between 1968 and 2018');
  }
  const albums = await getChart({ page, year });
  await Promise.all(albums.map(async function (album) {
    if(!album) return
    const doc = await Album.create(album);
    this.queue.add('getAlbumDetails', {
      id: doc._id,
      href: album.meta.rym.href
    });
  }.bind({ queue: this.queue })));
  return;
}