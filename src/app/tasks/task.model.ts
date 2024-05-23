export class Task {
  public id: string;
  public title: string;
  public detail: string;
  public creationDatetime: string;
  public isDone: boolean = false;

  constructor(id: string, title: string, detail: string) {
    this.id = id;
    this.title = title;
    this.detail = detail;
    this.creationDatetime = new Date().toDateString();
  }
}
