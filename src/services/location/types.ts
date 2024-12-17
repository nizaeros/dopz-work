export interface LocationSearchResult {
  id: string;
  name: string;
  state: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
  };
}