import { IEntity } from "./entity.interface";

export interface IRepository<TEntity extends IEntity> {
    list(): Promise<TEntity[]>;
    save(entity: TEntity): Promise<void>;
    update(id: string, updateEntity: Partial<TEntity>): Promise<void>;
    remove(id: string): Promise<void>; 
}   