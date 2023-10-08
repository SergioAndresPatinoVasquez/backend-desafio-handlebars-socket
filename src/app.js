import express from "express"
import handlebars from "express-handlebars";
import {
    __dirname
} from "./utils.js";
import {
    Server
} from "socket.io";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import vistaRouter from "./routes/views.routes.js";
import ProductManager from "./managers/ProductManager.js";

const product = new ProductManager();

const app = express();

// //archivos estaticos
app.use(express.static(`${__dirname}/public`));

//configurar motor (engine) de plantillas handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.use("/", vistaRouter);

const server = app.listen(8080, () => {
    console.log("Servidor express en puerto 8080");
});

//Socket io
const socketServer = new Server(server);


socketServer.on('connection', socket => {
    console.log('Cliente conectado');

    socket.on('messageAddProduct', async (data) => {
        try {
                        
            await product.addProducts(JSON.parse(data)); //lo agrego
            socketServer.emit('messageAllProducts', await product.getAll()); //los muestro todos
        } catch {

        }
    });


    //leo el id = data
    socket.on('deleteProduct', async (data) => {
        try {
            
            await product.deleteProduct(data); //lo elimino
            socketServer.emit('products', await product.getAll()); //los muestro todos
        } catch {

        }
    });

})




app.set('socketio', socketServer);