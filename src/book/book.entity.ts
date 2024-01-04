import { IEntity } from "src/entity.interface";

export class BookEntity implements IEntity {
    id: string;
    title: string;
}