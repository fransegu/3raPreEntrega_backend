import { productsManager } from "../DAL/dao/mongoDB/productsManagerDB.js";


export const findAllProds = async (query) => {
    try {
        const products = await productsManager.findAll(query);
        return products;
    } catch (error) {
        throw new Error("Product not found");
    }
    };

    export const findProdById = async (idProduct) => {
    try {
        const product = await productsManager.findById(idProduct);
        if (!product) {
        throw new Error("No product found with that id");
        }
        return product;
    } catch (error) {
        throw new Error("Product with ID not found");
    }
    };

    export const createProd = async (data) => {
    const { title, description, code, price, stock } = data;
    if (!title || !description || !code || !price) {
        throw new Error("Required data is missing");
    }
    try {
        const newProduct = await productsManager.createOne(data);
        return newProduct;
    } catch (error) {
        throw new Error("Error creating product");
    }
    };

    export const deleteOneProd = async (idProduct) => {
    try {
        if (!idProduct) {
        throw new Error("No product found with that id");
        }
        await productsManager.deleteOne(idProduct);
    } catch (error) {
        throw new Error("Error deleting product");
    }
    };
    export const updateProd = async(idProduct, obj)=> {
        try {
            if(!idProduct){
            throw new Error ("No product found with that id");    
            }
            await productsManager.updateOne(idProduct, obj)
        } catch (error) {
            throw new Error ("Error updating product");
        }
    }