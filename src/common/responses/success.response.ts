export class SuccessResponse<TData> {
  readonly data: TData;

  constructor(data: TData) {
    this.data = data;
  }
}
