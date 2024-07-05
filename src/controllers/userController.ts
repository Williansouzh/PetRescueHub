import { User } from "@src/entities/User";
import { IUser } from "@src/interfaces/IUser";
import { UserService } from "@src/services/userService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password, role } = req.body;

    try {
      const user: IUser = { email, name, password, role };
      const createdUser = await this.userService.createUser(user);

      const sanitizedUser = {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        role: createdUser.role,
      };

      return res
        .status(201)
        .json({ message: "User created", user: sanitizedUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Error creating user", error: error });
    }
  }
}
