import * as moment from 'moment';
import { AlbumDetails } from './rym';
import { promises as fs } from 'fs';
import { getDetails } from './getAlbumDetails';

describe('#getAlbumDetails', () => {
  let details:AlbumDetails;
  beforeAll(async () => {
    const html:string = await fs.readFile(`${__dirname}/samplePages/album.html`, 'utf8');
    details = getDetails(html);
  });
  
  describe('#releaseDate', () => {
    it('should accurately parse album release date', () => {
      const expected = moment('2019-04-05');
      const isAccurate = expected.isSame(details.releaseDate, 'day');
      expect(isAccurate).toEqual(true);
    });
  });

  describe('#nRatings', () => {
    it('should accurately parse album no. of ratings', () => {
      expect(details.nRatings).toEqual(582);
    });
  });

  describe('#descriptors', () => {
    it('should accurately parse album descriptors', () => {
      const expected = [
        "female vocals",
        "lush",
        "ethereal",
        "soft",
        "melodic",
        "epic",
        "romantic",
        "warm",
        "aquatic",
        "love"
      ];
      expect(details.descriptors).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('#languages', () => {
    it('should accurately parse album languages', () => {
      expect(details.languages.length).toEqual(0);
    });
  })

  describe('#secondaryGenres', () => {
    it('should accurately parse album languages', () => {
      const expected = [
        'Dream Pop',
        'Progressive Pop',
        'Chamber Folk'
      ];
      expect(details.secondaryGenres).toEqual(expect.arrayContaining(expected));
    });
  })
});