import { createCart, findCartById, addProduct, deleteProductsInCart, updateAllProducts, updateProductInCart, deleteOneFromCart} from "../services/carts.service.js";


export const createACartController = (req, res) => {
    try{
        const cart = createCart();
        res.status(200).json({ cart });
    }catch (error){
        res.status(500).json({message: error.message})
    }
};


export const findCartController = async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await findCartById(cid);
        if (!cart) {
                return res.status(404).json({ message: "No cart found with the id" });
            }
        res.status(200).json({ message: "Cart found", cart });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }        
};


export const addProductToCartController =  async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const productAdded = await addProduct(cid, pid);
    res.status(200).json({ message: "Product added to Cart", cart: productAdded });
    }catch (error){
        res.status(500).json({ message: error.message });
    }    
};


export const deleteFromCartController =  async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid ) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const productDeleted= await deleteOneFromCart(cid, pid);
    res.status(200).json({ message: "Product deleted to Cart", cart: productDeleted });
    }catch (error){
        res.status(500).json({ message: error.message });
    }    
};


export const updateProductsController = async (req, res) => {
    const { cid } = req.params;
    try {
        const { products } = req.body
        const cartProds = await updateAllProducts(cid, products);       
        res.status(200).json({ message: "Products updated", cartProds });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProdQuantityController = async (req, res) => {    
    try {
        const {cid, pid} = req.params
        const { quantity } = req.body        
        const response = await updateProductInCart(cid, pid, +quantity);       
        res.status(200).json({ message: "Product updated", response });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteAllProductsInCartController = async (req, res) => {    
    try {
        const {cid} = req.params              
        const response = await deleteProductsInCart(cid);       
        res.status(200).json({ message: "Products deleted", response });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

}