export interface IFilters {
  equals?(initialState: IFilters): IFilters;
  sort: number;
  search: string;
  manufacturer: string[];
  color: string[];
  price: (number | string)[];
  amount: (number | string)[];
  button: string[];
  brand?: string[];
}
