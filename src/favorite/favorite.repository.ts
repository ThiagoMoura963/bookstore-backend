import { BaseRepository } from "src/base.repository";
import { FavoriteEntity } from "./favorite.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FavoriteRepository extends BaseRepository<FavoriteEntity> {
    constructor() {
        super('favorites.json');
    }
}