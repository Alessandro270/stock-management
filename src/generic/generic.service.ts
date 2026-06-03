import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export class GenericService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<ObjectLiteral> {
    const entity = this.repository.create(data);
    await this.repository.save(entity);
    return entity;
  }
  findAll(relations?: string[] | []): Promise<ObjectLiteral[]> | [] {
    return this.repository.find({ relations });
  }
  findOne(id: string): Promise<ObjectLiteral | null> {
    return this.repository.findOneBy({ id } as any);
  }

  findOneBy(filter: Record<string, any>): Promise<ObjectLiteral | null> {
    return this.repository.findOneBy({ ...filter } as any);
  }

  findOneWithRelations(
    filter: Record<string, any>,
    relations: string[],
  ): Promise<ObjectLiteral | null> {
    const query = this.repository.createQueryBuilder('entity');
    relations.forEach(relation => {
      query.leftJoinAndSelect(`entity.${relation}`, relation);
    });
    return query.where(filter).getOne();
  }

  async update(id: string, data: Partial<T>): Promise<ObjectLiteral | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<ObjectLiteral> {
    return await this.repository.delete(id);
  }
}
