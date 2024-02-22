import { Router } from "express";
import { findProdsController, findProductByIdController, createProductController, deleteOneProductController, updateProductController } from '../controllers/products.controller.js';

const router = Router();
router.get("/", findProdsController);
router.get('/:pid', findProductByIdController)
router.post("/", createProductController);
router.delete("/:pid", deleteOneProductController);
router.put("/:pid", updateProductController);

export default router