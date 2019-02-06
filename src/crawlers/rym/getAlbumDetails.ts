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

function getDetails(html:string):AlbumDetails {
  const $ = cheerio.load(html);
  const albumInfoTable = $('.album_info');
  const rawDate = getByRowTitle($, 'Released');
  const releaseDate = moment(rawDate, 'D MMMM YYYY').toDate();
  const nRatingsRaw = albumInfoTable.find('.num_ratings > b').text();
  const nRatings:number = parseInt(nRatingsRaw.replace(',', '').replace(' ', ''));
  const descriptors:string[] = getByRowTitle($, 'Descriptors').split(', ').map(desc => desc.trim());
  const languages:string[] = getByRowTitle($, 'Language').split(', ').map(desc => desc.trim());
  const details:AlbumDetails = {
    releaseDate,
    nRatings,
    descriptors,
    languages,
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