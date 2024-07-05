import { IRepository } from "../interfaces/IRepository";

export abstract class BaseRepository<T> implements IRepository<T> {
  abstract getById(id: string): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}
