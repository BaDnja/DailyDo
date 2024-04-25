
export class Task {
  public title: string;
  public detail: string;
  public creationDatetime: Date;
  public isDone: boolean = false;

  constructor(title: string, detail: string) {
    this.title = title;
    this.detail = detail;
    this.creationDatetime = new Date();
  }
}
