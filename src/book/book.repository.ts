import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BaseRepository } from 'src/base.repository';

@Injectable()
export class BookRepository extends BaseRepository<BookEntity> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public saveById(id: string): Promise<BookEntity> {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super('books.json');
  }
}
