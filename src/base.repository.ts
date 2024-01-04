import { IRepository } from "./base.interface.repository";
import { IEntity } from "./entity.interface";

export abstract class BaseRepository<TEntity extends IEntity> implements IRepository<TEntity>{
    private entities: TEntity[] = [];

    private getById(id: string): TEntity{
        const potentialEntity = this.entities.find(entity => entity.id === id);

        if(!potentialEntity) {
            throw new Error(`${this.entities[0]?.constructor.name} não foi encontrada`);
        }

        return potentialEntity;
    }

    public async list(): Promise<TEntity[]> {
        return this.entities;
    }

    public async save(entity: TEntity): Promise<void> {
        this.entities.push(entity);
    }

    public async update(id: string, entity: Partial<TEntity>): Promise<TEntity> {
        const foundEntity = this.getById(id);

        Object.entries(entity).forEach(([key, value]) => {
            if(key === 'id') {
                return;
            }

            foundEntity[key] = value;
        });

        return foundEntity;
    }

    public async remove(id: string): Promise<TEntity> {
        const foundEntity = this.getById(id);

        this.entities = this.entities.filter(entity => entity.id !== id);

        return foundEntity;
    }
}