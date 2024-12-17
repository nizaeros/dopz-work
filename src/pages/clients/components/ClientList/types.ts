export interface FilterOptions {
  parentAccount: string | null;
  entityType: string | null;
  industry: string | null;
  country: string | null;
  city: string | null;
}

export interface SearchOptions {
  query: string;
  filters: FilterOptions;
}