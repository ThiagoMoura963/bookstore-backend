import { IEntity } from './entity.interface';

export interface IRepository<TEntity extends IEntity> {
  list(): Promise<TEntity[]>;
  saveByEntity(entity: TEntity): Promise<void>;
  saveById(id: string): Promise<TEntity>;
  update(id: string, updateEntity: Partial<TEntity>): Promise<void>;
  remove(id: string): Promise<void>;
}
