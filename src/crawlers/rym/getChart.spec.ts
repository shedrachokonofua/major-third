import * as nock from 'nock';
import Album from '../../modules/album/album';
import { ChartData } from './rym';
import getChart, { getAlbums } from "./getChart";
import { promises as fs } from 'fs';

describe('#getAlbums', () => {
  let albums:Album[];

  beforeAll(async () => {
    const html = await fs.readFile(`${__dirname}/samplePages/chart.html`, 'utf8');
    albums = getAlbums(html);
  });

  it('should parse rym page and return all albums', async () => {
    expect(albums.length).toBe(40);
  });

  it('should accurately parse album details', async () => {
    expect(albums[9].artists).toContain('The Beatles');
    expect(albums[20].name).toEqual('A Love Supreme');
    expect(albums[27].genres).toContain('Abstract Hip Hop');
    expect(albums[4].meta.rym.rating).toEqual(4.28);
    expect(albums[31].meta.rym.href).toEqual('/release/album/nas/illmatic/');
    expect(albums[31].meta.rym.artistsHref[0].href).toEqual('/artist/nas');
  });

  it('should support multiple artists', async () => {
    expect(albums[3].artists).toContain('Nico');
    expect(albums[3].artists).toContain('The Velvet Underground');

    const artistNames = albums[3].meta.rym.artistsHref.map(artist => artist.name);
    expect(artistNames).toContain('Nico');
    expect(artistNames).toContain('The Velvet Underground');

    const artistPages = albums[3].meta.rym.artistsHref.map(artist => artist.href);
    expect(artistPages).toContain('/artist/the-velvet-underground');
    expect(artistPages).toContain('/artist/nico');
  });

  it('should support multiple genres', async () => {
    expect(albums[17].genres).toContain('New Wave');
    expect(albums[17].genres).toContain('Post-Punk');
  });
});

describe('#getChart', () => {
  let html;

  beforeAll(async () => {
    html = await fs.readFile(`${__dirname}/samplePages/chart.html`, 'utf8');
  });

  it('should request correct page', async () => {
    const req:ChartData = {
      page: 11,
      year: 2015,
      genre: 'rap'
    }
    const expected:URL = new URL('https://rateyourmusic.com/customchart');
    expected.searchParams.append('page', req.page.toString());
    expected.searchParams.append('year', req.year.toString());
    expected.searchParams.append('genres', req.genre);


    const scope = nock(expected.origin)
      .get(expected.pathname+expected.search)
      .reply(200, html);
    
    await getChart(req);
    expect(scope.isDone()).toBe(true);
  });
});