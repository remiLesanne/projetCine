export interface Movie {
  id?: number;
  title: string;
  releaseDate: Date | string;
  director: string;
  rate?: number;
  synopsis: string;
  image?: string;
}
