import { BaseRepository } from 'src/base.repository';
import { FavoriteEntity } from './favorite.entity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BookEntity } from 'src/book/book.entity';
// import { IFavoriteRepository } from './favorite.interface';

@Injectable()
export class FavoriteRepository extends BaseRepository<FavoriteEntity> {
  constructor() {
    super('favorites.json');
  }

  public async save(id: string): Promise<void> {
    const encoding = 'utf8';
    const books = await fs.promises.readFile('books.json', encoding);
    const favorites = await fs.promises.readFile('favorites.json', encoding);

    const foundBook = JSON.parse(books).find(
      (book: BookEntity) => book.id === id,
    );

    if (foundBook) {
      const newList = [...JSON.parse(favorites), foundBook];
      await fs.promises.writeFile('favorites.json', newList);
    } else {
      throw new Error('Livro não encontrado');
    }
  }

  public async save(entity: FavoriteEntity): Promise<void> {}
}
