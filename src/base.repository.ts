import { IRepository } from './base.interface.repository';
import { IEntity } from './entity.interface';
import * as fs from 'fs';

export abstract class BaseRepository<TEntity extends IEntity> implements IRepository<TEntity>{
    protected fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    private async readEntities(): Promise<TEntity[]> {
        try {
            const encoding = 'utf8';
            const data = await fs.promises.readFile(this.fileName, encoding);
            
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private async writeEntities(entities: TEntity[] | TEntity): Promise<void> {
        await fs.promises.writeFile(this.fileName, JSON.stringify(entities, null, 2));
    }

    private async getById(id: string): Promise<TEntity> {
        const entities = await this.readEntities();

        const potentialEntity = entities.find(entity => entity.id === id);

        if(!potentialEntity) {
            throw new Error('Id não encontrado');
        }

        return potentialEntity;
    }

    public async list(): Promise<TEntity[]> {
        return this.readEntities();
    }

    public async save(entity: TEntity): Promise<void> {
        const entities = await this.readEntities();
        
        const newList = [...entities, entity];

        await this.writeEntities(newList);
    }

    public async update(id: string, entity: Partial<TEntity>): Promise<void> {
        const foundEntity = await this.getById(id);

        Object.entries(entity).forEach(async ([key, value]) => {
            if(key === 'id') {
                return;
            }

            foundEntity[key] = value;

            await this.writeEntities(foundEntity);
        });
    }

    public async remove(id: string): Promise<void> {
        const foundEntity = await this.getById(id);
        const entities = await this.readEntities();
    
        const filteredEntities = entities.filter(entity => entity.id !== foundEntity.id);
    
        await this.writeEntities(filteredEntities);
    }
}