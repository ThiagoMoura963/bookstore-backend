import { Module } from "@nestjs/common";
import { FavoriteController } from "./favorite.controller";
import { FavoriteRepository } from "./favorite.repository";

@Module({
    controllers: [FavoriteController],
    providers: [FavoriteRepository]
})
export class FavoriteModule { }