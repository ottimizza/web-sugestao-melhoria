export class PageInfo {

  hasNext: boolean;
  hasPrevious: boolean;

  pageIndex: number;
  pageSize: number;

  totalPages: number;
  totalElements: number;

  constructor(builder: any) {
    this.hasNext = builder.hasNext;
    this.hasPrevious = builder.hasPrevious;
    this.pageIndex = builder.pageIndex;
    this.pageSize = builder.pageSize;
    this.totalPages = builder.totalPages;
    this.totalElements = builder.totalElements;
  }

}

export class GenericPageableResponse<T> {

  pageInfo: PageInfo;

  records: Array<T>;

}
