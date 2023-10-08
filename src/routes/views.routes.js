import {
    Router
} from "express";
import ProductManager from "../managers/ProductManager.js";

const vistaRouter = Router();
const product = new ProductManager();


vistaRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Para el formulario
vistaRouter.get("/", async (req, res) => {
    let allProducts = await product.getAll()
    res.render("home", {
        style: "styles.css",
        title: "Handlebars-socket",
        products: allProducts
    })
})

vistaRouter.get("/:id", async (req, res) => {
    console.log(req.params.id)
    let prod = await product.getProductsById(req.params.id)
    res.render("productId", {
        style: "styles.css",
        title: "Handlebars-socket",
        products: prod
    })
})

//Para http post
vistaRouter.post('/realtimeproducts', async (req, res) => {
    await product.addProducts(req.body);

    const io = req.app.get('socketio');
    io.emit("messageAddProducts", await product.getAll());
    res.send({
        status: 'success'
    })
})

vistaRouter.delete('/:pid', async (req, res) => {
    await product.deleteProduct(req.params.pid);

    const io = req.app.get('socketio');
    io.emit("messageAddProducts", await product.getAll());
    res.send({
        status: 'success'
    })
})


export default vistaRouter;