export interface AlbumDetails {
  releaseDate: Date;
  nRatings: Number;
  descriptors: string[];
  languages: string[];
  html: string;
}

export interface ChartData {
  page?:number;
  year?:number;
  genres?:string;
}

export interface RymMeta {
  href: string;
  rating: number;
  artistsHref: {
    name: string,
    href: string
  }[];
}