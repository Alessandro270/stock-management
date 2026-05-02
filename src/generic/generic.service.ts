import { Injectable } from '@nestjs/common';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class GenericService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  create(data: DeepPartial<T>): Promise<ObjectLiteral> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }
  findAll(): Promise<ObjectLiteral[]> | [] {
    return this.repository.find();
  }
  findOne(id: string): Promise<ObjectLiteral | null> {
    return this.repository.findOneBy({ id } as any);
  }
  findOneBy(filter: Record<string, any>): Promise<ObjectLiteral | null> {
    return this.repository.findOneBy({ ...filter } as any);
  }
  async update(id: string, data: Partial<T>): Promise<ObjectLiteral | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }
  async remove(id: string): Promise<ObjectLiteral> {
    return await this.repository.delete(id);
  }
}
