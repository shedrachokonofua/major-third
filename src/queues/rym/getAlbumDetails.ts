import getAlbumDetails from '../../crawlers/rym/getAlbumDetails';
import { AlbumDetails } from '../../crawlers/rym/rym';
import Album from "../../modules/album/index";

export default async function(job) {
  const { id, href } = job.data;
  const details:AlbumDetails = await getAlbumDetails(href);
  const descriptors:string[] = details.descriptors;
  delete details.descriptors;

  const album = await Album.findById(id);
  album.descriptors = album.descriptors.concat(descriptors); 
  album.meta.rym = details;
  await album.save();
  return;
}