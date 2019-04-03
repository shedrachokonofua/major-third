import * as cheerio from 'cheerio';
import axios from 'axios';
import * as moment from 'moment';
import { AlbumDetails } from './rym';

export default async function getAlbumDetails(href:string):Promise<AlbumDetails> {
  const html:string = await getPage(href);
  return getDetails(html);
}

async function getPage(href:string):Promise<string> {
  const websiteUrl:string = 'https://rateyourmusic.com';
  if(!href.includes(websiteUrl)) {
    href = websiteUrl + href;
  }
  const response = await axios.get(href);
  const html = response.data;
  return html;
}

export function getDetails(html:string):AlbumDetails {
  const $ = cheerio.load(html);
  const albumInfoTable = $('.album_info');
  const rawDate = getByRowTitle($, 'Released');
  const nRatingsRaw = albumInfoTable.find('.num_ratings > b').text();
  
  const details:AlbumDetails = {
    releaseDate: moment(rawDate, 'D MMMM YYYY').toDate(),
    nRatings: parseInt(nRatingsRaw.replace(',', '').replace(' ', '')),
    descriptors: getListRow($, 'Descriptors'),
    languages: getListRow($, 'Language'),
    secondaryGenres: getSecondaryGenres($),
    html
  };
  return details;
}

function getByRowTitle($, title: string):string {
  const albumInfoTable = $('.album_info');
  const albumTableRows = albumInfoTable.find('tbody > tr');
  const row = albumTableRows.filter(function() {
    const rowTitle = $(this).find('th').text().trim();
    return rowTitle == title;
  });
  return row.find('td').first().text().trim();
}

function getListRow($, name): string[] {
  const row = getByRowTitle($, name);
  if(row === '') return [];
  return row.split(', ').map(item => item.trim());
}

function getSecondaryGenres($): string[] {
  const secondaryGenresList = $('.release_sec_genres > a');
  const secondaryGenres = secondaryGenresList.map((i, elem) => $(elem).text()).get();
  return secondaryGenres;
}