const PDFDocument = require('pdfkit');
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

//generate PDF
exports.generatePDF = (product) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../../temp/${product.id}.pdf`);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);
        doc.fontSize(20).text(`Product Details`, { Underline: true });
        doc.text(`Price: ${product.price}`)
        doc.created_at(`created At: ${product.created_at}`)
        doc.end();

        stream.on("finish", () => {
            resolve(filePath);
        })
        stream.on("error", (err) => {
            reject(err);
        })
    })
}

exports.mergePDFs = async (pdfPaths) => {
    const mergedPDF = await PDFDocument.create();
    for (const pdfPath of pdfPaths) {
        const pdfBytes = fs.readFileSync(pdfPath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPDF.copypages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
            mergedPDF.addPage(page)
        })
    }

    const mergedPdfBytes = await mergedPDF.save();
    const mergedPDFPath = path.join(__dirname, "../../temp/merged.pdf");
    fs.writeFileSync(mergedPDFPath, mergedPdfBytes);
    return mergedPDFPath;
};

