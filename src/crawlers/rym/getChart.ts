import { URL } from 'url';
import axios from 'axios';
import Album from '../../modules/album/album';
import * as cheerio from 'cheerio';
import { ChartData, RymMeta } from './rym';

export default async function getChart({ page = 1, year, genre }:ChartData):Promise<Album[]>  {
  const baseUrl:URL = new URL('https://rateyourmusic.com/customchart');

  baseUrl.searchParams.append('page', page.toString());
  if(year) baseUrl.searchParams.append('year', year.toString());
  if(genre) baseUrl.searchParams.append('genres', genre);
  const response = await axios.get(baseUrl.href);
  const html = response.data;
  return getAlbums(html);
}

export function getAlbums(html):Album[] {
  const albums:Album[] = [];
  const $ = cheerio.load(html);
  const chart = $('table.mbgen');
  const albumElems = chart.find('tr');

  if(albumElems.length === 0) throw new Error('No albums found.')

  albumElems.each(function () {
    const artistElems = $(this).find('a.artist');
    if(artistElems.length === 0) return;

    const artists:{name: string, href: string}[] = artistElems.map((i, elem) => ({
      name: $(elem).text(),
      href: $(elem).attr('href')
    })).get();
    const artistNames:string[] = artists.map(artist => artist.name);
    const name = $(this).find('a.album').text();
    const href = $(this).find('a.album').attr('href');
    const genres = $(this).find('a.genre').map((i, elem) => $(elem).text()).get();
    const rating = $(this).find('.chart_stats > a:first-of-type > b:first-of-type').text();

    const rym:RymMeta = {
      href,
      rating: parseFloat(rating),
      artistsHref: artists
    };
    albums.push({  
      name, 
      genres, 
      artists: artistNames,
      meta: { rym }
    });
  });
  return albums;
}