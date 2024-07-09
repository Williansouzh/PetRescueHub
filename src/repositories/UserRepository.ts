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
  public async getById(id: number): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }
  async getAll(
    page: number,
    limit: number
  ): Promise<{ items: User[]; total: number }> {
    const [users, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items: users, total };
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
