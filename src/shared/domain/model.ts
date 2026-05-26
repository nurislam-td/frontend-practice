export type Page<T> = {
  limit: number;
  offset: number;
  data: T[];
};
