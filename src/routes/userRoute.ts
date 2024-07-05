import "../utils/module-alias";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/userService";
import { Router } from "express";
import { User } from "@src/entities/User";
import { validateUser } from "@src/middleware/validation";
const route = Router();
const url = "/pet-resucue";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
route.post(url, validateUser, userController.createUser.bind(userController));

export default route;
