import getAlbumDetails from '../../crawlers/rym/getAlbumDetails';
import { AlbumDetails } from '../../crawlers/rym/rym';
import Album from "../../modules/album/index";

export default async function(job) {
  const { id, href } = job.data;
  const details:AlbumDetails = await getAlbumDetails(href);
  await Album.findByIdAndUpdate(id, { 'meta.rym': details });
  return;
}