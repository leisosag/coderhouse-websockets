const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
let products = [];

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public/'));
app.use('*/js', express.static('public/js'));
app.use('*/css', express.static('public/css'));

io.on('connection', function (socket) {
	console.log('Conectado!');
	socket.emit('products', products); // emitir todos los productos a un cliente nuevo

	socket.on('new-product', function (data) {
		products.push({ socketId: socket.id, product: data }); // agregar producto a array
		io.sockets.emit('products', products); //emitir a todos los productos
	});
});

app.get('/', (req, res) => res.render('form'));

app.get('/productos', (req, res) => {
	res.render('products', { products });
});

app.post('/productos', (req, res) => {
	let product = req.body;
	products.push(product);
	res.redirect('/');
});

const PORT = 8080;
const srv = server.listen(PORT, () =>
	console.log(`Servidor corriendo en el puerto ${srv.address().port}`)
);
srv.on('error', (err) => console.error(`Error en el servidor ${err}`));
