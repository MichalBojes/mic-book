export class Book {
  constructor(
    public id: string,
    public title: string,
    public otherTitle: string,
    public authorName: string,
    public publisher: string,
    public publicationCity: string,
    public publicationYear: string,
    public numberOfAvailable: string,
    public amount: string,
    public topic: string,
    public publicationType: string,
  ) {
  }
}
