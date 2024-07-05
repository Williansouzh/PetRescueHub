import { User } from "@src/entities/User";
import { IUser } from "@src/interfaces/IUser";
import { UserRepository } from "@src/repositories/UserRepository";
export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async createUser(userPayload: IUser) {
    return await this.userRepository.create(userPayload as unknown as User);
  }
}
