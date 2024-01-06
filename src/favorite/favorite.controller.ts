import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';

@Controller('/favorites')
export class FavoriteController {
  constructor(private favoriteRepository: FavoriteRepository) {}

  //   @Post()
  //   async createFavorite(@Param('id') id: string) {}

  @Get()
  async listFavorites() {
    return this.favoriteRepository.list();
  }
}
