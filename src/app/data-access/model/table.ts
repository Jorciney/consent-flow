export interface TableMetadata {
  prop: string;
  title: string;
}
export interface DataWithPagination<T> {
  start?: number;
  count?: number;
  size?: number;
  data?: Array<T>;
}
export interface QueryPage {
  start: number;
  count: number;
  size?: number;
}
