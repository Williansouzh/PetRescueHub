import "../utils/module-alias";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/userService";
import { Router } from "express";
import { User } from "@src/entities/User";
import { validateUser } from "@src/middleware/validation";
import { authMiddleware } from "@src/middleware/auth";
const route = Router();
const url = "/pet-rescue/users";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

route.post(
  `${url}`,
  validateUser,
  userController.createUser.bind(userController)
);
route.post(`${url}/login`, userController.login.bind(userController));
route.post(
  `${url}/forgot-password`,
  userController.forgotPassword.bind(userController)
);
route.post(
  `${url}/reset/:token`,
  userController.resetPassword.bind(userController)
);
route.use(authMiddleware);
route.use(`${url}/logout`, userController.logout.bind(userController));
route.get(`${url}/me`, userController.loggedUserInfo.bind(userController));
route.put(`${url}/me`, userController.editUser.bind(userController));

route.get(`${url}`, userController.getAll.bind(userController));

export default route;
