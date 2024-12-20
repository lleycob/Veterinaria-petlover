document.addEventListener("DOMContentLoaded", function() {
    // Recuperar el carrito desde localStorage o inicializarlo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener todos los botones de "Añadir al carrito"
    const botonesAñadir = document.querySelectorAll('.add-to-cart');

    // Función para agregar productos al carrito
    botonesAñadir.forEach(button => {
        button.addEventListener('click', function() {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-name');
            const precio = parseFloat(button.getAttribute('data-price'));

            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.id === id);
            if (productoExistente) {
                // Si ya está, aumentar la cantidad (en caso de que quieras manejar cantidades)
                productoExistente.cantidad += 1;
            } else {
                // Si no está, agregarlo como nuevo producto
                const producto = {
                    id: id,
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                };
                carrito.push(producto);
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Actualizar la vista del carrito
            actualizarCarrito();

            // Mostrar el mensaje de producto añadido
            mostrarMensaje();
        });
    });

    // Función para mostrar el mensaje de producto añadido
    function mostrarMensaje() {
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje');
        mensaje.innerText = 'Producto añadido a tu carrito';

        // Agregar el mensaje al body
        document.body.appendChild(mensaje);

        // Eliminar el mensaje después de 1 segundo
        setTimeout(() => {
            mensaje.remove();
        }, 1000); // 1000 ms = 1 segundo
    }

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        const cesta = document.querySelector('.productos-cesta');
        const totalCarrito = document.querySelector('.total');

        // Limpiar el carrito antes de actualizarlo
        cesta.innerHTML = '';
        let total = 0;

        // Mostrar los productos del carrito
        carrito.forEach(producto => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('producto-carrito');
            itemCarrito.innerHTML = `
                <p>${producto.nombre} x ${producto.cantidad}</p>
                <p>S/ ${producto.precio.toFixed(2)}</p>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            `;
            cesta.appendChild(itemCarrito);

            total += producto.precio * producto.cantidad; // Multiplicar por la cantidad
        });

        // Mostrar el total
        totalCarrito.innerHTML = `Total: S/ ${total.toFixed(2)}`;

        // Añadir funcionalidad para eliminar productos del carrito
        const botonesEliminar = document.querySelectorAll('.eliminar');
        botonesEliminar.forEach(button => {
            button.addEventListener('click', function() {
                const idProducto = button.getAttribute('data-id');
                carrito = carrito.filter(producto => producto.id !== idProducto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    }

    // Función para procesar la compra
    const botonComprar = document.querySelector('.comprar');
    if (botonComprar) {
        botonComprar.addEventListener('click', function() {
            if (carrito.length > 0) {
                ('');
                carrito = []; // Limpiar el carrito
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            } else {
                alert('Tu carrito está vacío');
            }
        });
    }

    // Inicializar la vista del carrito cuando se carga la página
    actualizarCarrito();
});
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productPrice = parseFloat(this.getAttribute('data-product-price'));
            
            // Agregar el producto al carrito (esto es solo un ejemplo)
            addToCart(productId, productPrice);
        });
    });

    function addToCart(id, price) {
        // Logica para agregar al carrito y actualizar el total
        console.log(`Producto añadido al carrito: ID=${id}, Precio=${price}`);
    }
});

