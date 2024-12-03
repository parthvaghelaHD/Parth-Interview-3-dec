const Joi = require("joi");
const productModel = require("../models/productModels");

// to handle or check the validations on the request body
const productSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().allow("").required(),
    price: Joi.number().positive().required()
})

// fetching all records from the database
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        throw new Error("error while getting all the products.")
    }
}

// add new product with the exact fields
exports.createProducts = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    try {
        const products = await productModel.createProduct(req.body);
        res.status(201).send({ message: "product added sucessfullly." });
    } catch (err) {
        console.log(err);
        throw new Error("error while add the products.")
    }
}

// update product based on the whatever user passed in the API
exports.updateProductById = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    const { id } = req.body;
    try {
        const rowsAffected = await productModel.updateProductById(req.body);

        if (rowsAffected === 0) {
            return res.status(404).send({
                error:
                    "product not found"
            })
        }
        res.status(200).send({ message: "product updated sucessfullly." });
    } catch (err) {
        console.log(err);
        throw new Error("error while update the products.")
    }
}

// delete the product based on the passed id in the API
exports.deleteProductById = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    const { id } = req.body;
    try {
        const rowsAffected = await productModel.deleteProductById(id);
        if (rowsAffected === 0) {
            return res.status(404).send({
                error:
                    "product not found"
            })
        }
        res.status(200).send({ message: "product deleted sucessfullly." });
    } catch (err) {
        console.log(err);
        throw new Error("error while delete the products.")
    }
}