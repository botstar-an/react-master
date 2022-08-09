import { User } from "./user";

export class Photo {
  id: string;
  name: string;
  description: string;
  image_url: string;
  author?: User;

  constructor(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.image_url = item.image_url;
    this.author = item.author;
  }
}

export type PhotoForm = Omit<Photo, 'id'>;
