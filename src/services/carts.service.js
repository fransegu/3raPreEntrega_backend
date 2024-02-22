
import { cartsModel } from "../config/models/cart.model.js";
import { cartsManager } from "../DAL/dao/mongoDB/cartsManagerDB.js";
import { ticketsManager } from "../DAL/dao/mongoDB/ticketsManagerDB.js";
import { v4 as uuidv4 } from "uuid";

export const createCart = async () => {
        const newCart = { products:[]};
        const response = await cartsModel.create(newCart);
        return response;
}
    
export const findCartById = async (idCart) =>{
        const response = await cartsModel.findById(idCart).populate("products.product");
        return response;
}

export const addProduct = async (idCart, idProduct)=>{
        const cart = await cartsModel.findById(idCart);
        const productIndex = cart.products.findIndex(
            (p)=>p.product.equals(idProduct)
        );

        if(productIndex===-1){
            cart.products.push({product: idProduct, quantity:1});
        }else{
            cart.products[productIndex].quantity++;
        }
        return cart.save();
}

export const findProductsInCart= async (idCart) =>{
        const cart = await cartsManager.findCartById(idCart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const productsInCart = cart.products.map(doc => doc.toObject());
        return productsInCart;
}

export const updateProductInCart= async (idCart, idProduct, quantity) => {
        const cart = await cartsManager.findCartById(idCart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const productIndex = cart.products.findIndex(
        (p) => p.product.equals(idProduct)
        );
        if (productIndex === -1) {
        throw new Error("Product not found in the cart");
        }
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
}

export const deleteOneFromCart = async (idCart, idProduct)=>{
        const cart = await cartsModel.findById(idCart);
        if (!cart) {
        throw new Error("Cart not found");
        }      
        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(idProduct)
    );
    if (productIndex === -1) {
        throw new Error("Product not found in the cart");
    }
        cart.products.splice(productIndex, 1);
        return cart.save();
}

export const deleteProductsInCart= async (idCart)=>{
        const cart = await cartsModel.findById(idCart);
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.products = [];
        await cart.save();
}

export const updateAllProducts= async (idCart, products)=>{
        const cart = await cartsModel.findById(idCart);
        const newProducts = products;
        cart.products = newProducts;
        await cart.save();
        return cart
}

export const getCarts = async ()=> {
        const carts = await cartsModel.find();
        return carts;
}

export const deleteCart= async (id)=>{
        const result = await cartsModel.deleteOne({_id: id});
        return result;
}

export const purchase = async (idCart, req, res) =>{
    const cart = await cartsManager.findCartById(idCart);
    const products = cart.products;
    let availableProducts = [];
    let unavailableProducts = [];
    let total = 0;

    for(let item of products){
        if(item.product.stock >= item.quantity){
            availableProducts.push(item);
            item.product.stock -= item.quantity;
            await item.product.save();
            total += item.quantity * item.product.price;
        }else{
            unavailableProducts.push(item);
        }
    }

    cart.products = unavailableProducts;
    await cart.save();
    if(availableProducts.length){
        const ticket ={
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount: total,
            //purchaser: "francisco.segu@gmail.com",
        };
        await ticketsManager.createTicket(ticket);
        return {availableProducts, total};
    }
    return {unavailableProducts};
}





















