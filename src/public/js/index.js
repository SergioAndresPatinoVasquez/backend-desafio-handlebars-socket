const socket = io();

//capturar el objeto a ingresar en el textarea
const addProduct = document.getElementById('addProduct');
const productIn = document.getElementById('product');
const allProducts = document.getElementById('allProducts');

//capturando id en textbox
//enviando productos restantes y eliminado el productId
const productId = document.getElementById('textbox');
const products = document.getElementById('products');

addProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = productIn.value;
    socket.emit('messageAddProduct', newProduct); //envio el objeto al server
    
    //limpio
    //productIn.value = '';

});

socket.on('messageAllProducts', (data) => {
    
    products.innerHTML = '';

    data.forEach(prod => {
        products.innerHTML += `
         <ul>
             <li>Title : ${prod.title}</li>
             <li>Description : ${prod.description}</li>
             <li>Code : ${prod.code}</li>
             <li>Price : ${prod.price}</li>
             <li>Status : ${prod.status}</li>
             <li>Stock : ${prod.stock}</li>
             <li>Category : ${prod.category}</li>
             <li>Thumbnail : ${prod.thumbnail}</li>
             <li>Id : ${prod.id}</li>
         </ul>        
        
         `;
    });
});



productId.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        socket.emit('deleteProduct', productId.value); //envio el id del producto al server
        
        //limpio
        productId.value = ''
    }
});

socket.on('products', (data) => {
    
    products.innerHTML = '';

    data.forEach(prod => {
        products.innerHTML += `
        <ul>
            <li>Title : ${prod.title}</li>
            <li>Description : ${prod.description}</li>
            <li>Code : ${prod.code}</li>
            <li>Price : ${prod.price}</li>
            <li>Status : ${prod.status}</li>
            <li>Stock : ${prod.stock}</li>
            <li>Category : ${prod.category}</li>
            <li>Thumbnail : ${prod.thumbnail}</li>
            <li>Id : ${prod.id}</li>
        </ul>        
        
        `;
    });
});
