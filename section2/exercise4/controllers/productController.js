const Joi = require("joi");
const productModel = require("../models/productModels");
const pdfService = require("../services/pdfservice");
const emailService = require("../services/email");

// to check the req body its like a common check for all the APIs
const productSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().allow("").required(),
    price: Joi.number().positive().required()
})

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        throw new Error("error while getting all the products.")
    }
}

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

exports.updateProductById = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    const { id } = req.body;
    try {
        const rowsAffected = await productModel.updateProductById(req.body);

        if(rowsAffected ===0) {
            return res.status(404).send({error: 
                "product not found"
            })
        }
        res.status(200).send({ message: "product updated sucessfullly." });
    } catch (err) {
        console.log(err);
        throw new Error("error while update the products.")
    }
}

exports.deleteProductById = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }
    const { id } = req.body;
    try {
        const rowsAffected = await productModel.deleteProductById(req.body);

        if(rowsAffected ===0) {
            return res.status(404).send({error: 
                "product not found"
            })
        }
        res.status(200).send({ message: "product deleted sucessfullly." });
    } catch (err) {
        console.log(err);
        throw new Error("error while delete the products.")
    }
}

exports.generateProductPDF = async(req, res) => {
    try{
        const product = await productModel.getProductById(req.params.id);
        if(!product) return res.status(404).send({ error : "Product Not Found"});

        const pdfpath = await pdfService.generatePDF(product);
        res.status(200).sendFile(pdfpath);
    }
    catch(err){
        throw new Error("Error while generating product PDF")
    }
}

//merge multiple products pdfs 
exports.mergeProductPDFS = async (req, res) => {
    const { productIds } = req.body;
    try{
        const pdfPaths = [];
        for(const id of productIds){
            const product = await productModel.getProductById(id);
            if(!product){
                continue;
            }
            const pdfpath = await pdfService.generatePDF(product);
            pdfpath.push(pdfpath);
        }

        if(pdfPaths.length === 0) {
            return res.status(400).send({ error : "No Valid Products PDFs to Merge"});

            const mergedPdfPath = await pdfService.mergePDFs(pdfPaths);

            res.status(200).sendFile(mergedPdfPath);
        }
    } catch (err){
        throw new Error("error in merge product pdf files")
    }
}

exports.sendProductPDFEmail = async (req, res) => {
    const { email } = req.body;
    if(!email ) return res.status(400).send({ error: "email is required"});

    try{
        const product = await productModel.getProductById(req.params.id);
        if(!product) return res.status(404).send({ error: "Product is not found"});

        const pdfPath = await pdfService.generatePDF(product);
        await emailService.sendEmailWithPDF(email, pdfPath);

        res.status(200).send({ message: "email sent sucessfully"});
    }
    catch (Err) {
        throw new Error("error in sending email with controller")
    }
}