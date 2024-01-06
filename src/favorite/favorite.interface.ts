export interface IFavoriteRepository {
  saveFavoriteBook(id: string): Promise<void>;
}
