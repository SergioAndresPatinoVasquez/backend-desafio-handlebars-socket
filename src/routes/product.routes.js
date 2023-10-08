import {
   Router
} from "express";
import ProductManager from "../managers/ProductManager.js";

const productRouter = Router()
const product = new ProductManager();

productRouter.get("/", async (req, res) => {
   res.send(await product.getAll())

})

productRouter.get("/:id", async (req, res) => {
   let id = req.params.id //ojo es un string  
   res.send(await product.getProductsById(id))

})

productRouter.put("/:id", async (req, res) => {
   let id = req.params.id //ojo es un string 
   let upDatedProduct = req.body
   res.send(await product.updatedProducts(id, upDatedProduct))

})


productRouter.post("/", async (req, res) => {
   let newProduct = req.body
   if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category) {
      return res.status(400).send({
         status: "error",
         error: "Incomplete values"
      });
   }

   res.send(await product.addProducts(newProduct))

})

productRouter.delete("/:id", async (req, res) => {
   let id = req.params.id

   res.send(await product.deleteProduct(id))
})

export default productRouter;