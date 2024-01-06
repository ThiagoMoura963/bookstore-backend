import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteEntity } from './favorite.entity';

@Controller('/favorites')
export class FavoriteController {
  constructor(private favoriteRepository: FavoriteRepository) {}

  @Post('/:id')
  async createFavorite(@Param('id') id: string) {
    const favoriteEntity = new FavoriteEntity();

    const book = await this.favoriteRepository.saveById(id);

    Object.assign(favoriteEntity, book);

    return {
      book: favoriteEntity,
      message: 'inserido com sucesso',
    };
  }

  @Get()
  async listFavorites() {
    return this.favoriteRepository.list();
  }

  @Delete('/:id')
  async removeFavorite(@Param('id') id: string) {
    const book = this.favoriteRepository.remove(id);

    return {
      favoriteBook: book,
      message: 'removido com sucesso',
    };
  }
}
