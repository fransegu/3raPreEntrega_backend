import { Router } from "express";
import { createACartController, addProductToCartController, deleteFromCartController, updateProductsController, deleteAllProductsInCartController, findCartController, updateProdQuantityController } from "../controllers/carts.controller.js";
import { purchase } from "../services/carts.service.js";
import { rollUserVerify } from "../middleware/rollVerify.js";

const router = Router();

router.post('/', createACartController)
router.get('/:cid', findCartController)
router.post('/:cid/products/:pid', rollUserVerify, addProductToCartController)
router.delete('/:cid/products/:pid', rollUserVerify,  deleteFromCartController)
router.put('/:cid', updateProductsController)
router.put('/:cid/products/:pid', updateProdQuantityController)
router.delete('/:cid', deleteAllProductsInCartController)
router.get("/:idCart/purchase", purchase);

export default router