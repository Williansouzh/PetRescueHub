import { User } from "@src/entities/User";
import { IUser } from "@src/interfaces/IUser";
import { UserRepository } from "@src/repositories/UserRepository";
import crypto from "crypto";
export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async findByResetPasswordToken(token: string): Promise<User | null> {
    const user = await this.userRepository.findByResetPasswordToken(token);
    return user || null;
  }

  async forgotPassword(user: User): Promise<string> {
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await this.userRepository.update(user.id, user);
    return user.resetPasswordToken;
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
