export type DocumentType = {
  title: string;
  location: string;
  size: string;
  type: string;
  createdAt: Date;
};

class Database {
  public documents: Array<DocumentType> | [] = [];

  getDocuments() {
    return this.documents;
  }
}

export default Database;
