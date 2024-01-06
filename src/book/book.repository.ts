import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BaseRepository } from 'src/base.repository';

@Injectable()
export class BookRepository extends BaseRepository<BookEntity> {
  constructor() {
    super('books.json');
  }
}
