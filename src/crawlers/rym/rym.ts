export interface AlbumDetails {
  releaseDate: Date;
  nRatings: Number;
  descriptors: string[];
  languages: string[];
  html: string;
  secondaryGenres: string[];
}

export interface ChartData {
  page?:number;
  year?:number;
  genre?:string;
}

export interface RymMeta {
  href: string;
  rating: number;
  artistsHref: {
    name: string,
    href: string
  }[];
  releaseDate?: Date;
  nRatings?: Number;
  languages?: string[];
  html?: string;
}