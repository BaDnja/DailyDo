
export class List {
  public id: string;
  public title: string;
  public groupId: string = '';

  constructor(id: string, title: string) {
    this.title = title;
    this.id = id;
  }
}
