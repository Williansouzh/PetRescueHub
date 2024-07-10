import { User } from "@src/entities/User";
import { IUser } from "@src/interfaces/IUser";
import AuthService from "@src/services/authService";
import { EmailService } from "@src/services/emailService";
import { UserService } from "@src/services/userService";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import crypto from "crypto";
export class UserController {
  private static emailService = new EmailService();
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
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
      try {
        UserController.emailService.sendWelcomeEmail(
          sanitizedUser.email,
          sanitizedUser.name
        );
      } catch (error) {
        console.error("Error creating user:", error);
        next(error);
      }

      res.status(201).json({
        message: "User created",
        user: sanitizedUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      next(error);
    }
  }
  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const user = await this.userService.findByResetPasswordToken(token);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Token inválido ou expirado.", token: user });
      }
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      console.error("Error reset user:", error);
      next(error);
    }
  }
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      return res.status(400).json("Email not found");
    }
    try {
      const token = await this.userService.forgotPassword(user);
      UserController.emailService.sendTokenResetEmail(
        user.email,
        user.name,
        token
      );
      res.json("email sent: " + token);
    } catch (error) {
      console.error("Error reset user:", error);
      next(error);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findByEmail(email);
      console.log(user);
      if (!user) {
        return res.status(401).json({
          code: 401,
          error: "User not found",
        });
      }
      if (!AuthService.comparePasswords(password, user.password)) {
        return res.status(401).json({
          code: 401,
          error: "Password does not macth!",
        });
      }
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = AuthService.generateToken(payload);
      return res.status(200).send({ token: token });
    } catch (error) {
      console.error("Error fetching users:", error);
      next(error);
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logout users:", error);
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { items: users, total } = await this.userService.getAll(
        page,
        limit
      );
      res.json({
        data: users,
        total,
        page,
        last_page: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      next(error);
    }
  }
  public async loggedUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        user: req.decoded,
      });
    } catch (error) {
      console.error("Error showing logged user info:", error);
      next(error);
    }
  }
  public async editUser(req: Request, res: Response, next: NextFunction) {
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
      res.json({
        user: sanitizedUser,
      });
    } catch (error) {
      console.error("Error showing edit user info:", error);
      next(error);
    }
  }
}
