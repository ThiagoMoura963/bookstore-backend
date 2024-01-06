import { BaseRepository } from 'src/base.repository';
import { FavoriteEntity } from './favorite.entity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BookEntity } from 'src/book/book.entity';

@Injectable()
export class FavoriteRepository extends BaseRepository<FavoriteEntity> {
  constructor() {
    super('favorites.json');
  }

  public async saveById(id: string): Promise<BookEntity | undefined> {
    const encoding = 'utf8';

    try {
      const books = await fs.promises.readFile('books.json', encoding);
      const favorites = await fs.promises.readFile('favorites.json', encoding);

      const foundBook = JSON.parse(books).find(
        (book: BookEntity) => book.id === id,
      );

      if (!foundBook) {
        throw new Error('Livro não encontrado');
      }

      const isBookInFavorites = JSON.parse(favorites).find(
        (favorite: FavoriteEntity) => favorite.id === id,
      );

      if (isBookInFavorites) {
        throw new Error('Livro já está nos favoritos');
      }

      const newList = [...JSON.parse(favorites), foundBook];
      await fs.promises.writeFile(
        'favorites.json',
        JSON.stringify(newList, null, 2),
      );

      return foundBook;
    } catch (error) {
      console.log(error);
    }
  }
}
