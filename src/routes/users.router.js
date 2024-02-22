import { Router } from "express";

import { findUserByIdController, findUserByEmailController, createUserController } from "../controllers/users.controller.js";
const router = Router();

router.get("/:idUser", findUserByIdController);
router.get("/email/:email", findUserByEmailController);
router.post("/", createUserController);

export default router;