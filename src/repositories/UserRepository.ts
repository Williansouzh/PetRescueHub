// src/repositories/UserRepository.ts
import { EntityTarget, Repository } from "typeorm";
import { User } from "../entities/User";
import { BaseRepository } from "./Baserepository";
import { AppDataSource } from "@src/data-source";

export class UserRepository implements BaseRepository<User> {
  private ormRepository: Repository<User>;

  constructor(User: EntityTarget<User>) {
    this.ormRepository = AppDataSource.getRepository(User);
  }
  async getById(id: string): Promise<User | null> {
    return null;
  }

  async getAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  async create(item: User): Promise<User> {
    const newUser = this.ormRepository.create(item);
    return await this.ormRepository.save(newUser);
  }

  async update(id: string, item: User): Promise<boolean> {
    const result = await this.ormRepository.update(id, item);
    return result.affected === 1;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected === 1;
  }
}
