import { User } from "@src/entities/User";
import { IUser } from "@src/interfaces/IUser";
import { UserRepository } from "@src/repositories/UserRepository";
export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async findOne(id: number) {
    return await this.userRepository.getById(id);
  }
  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
  async createUser(userPayload: IUser) {
    return await this.userRepository.create(userPayload as unknown as User);
  }
  async getAll(page: number, limit: number) {
    return this.userRepository.getAll(page, limit);
  }
}
