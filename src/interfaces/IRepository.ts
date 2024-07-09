export interface IRepository<T> {
  getById(id: number): Promise<T | null>;
  getAll(page: number, limit: number): Promise<{ items: T[]; total: number }>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
