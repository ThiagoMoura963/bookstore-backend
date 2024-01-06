import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [BookModule, FavoriteModule],
})
export class AppModule {}
