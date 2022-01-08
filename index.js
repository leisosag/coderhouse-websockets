const express = require('express');
// const pug = require('pug');
const path = require('path');
const app = express();
const products = [];

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/'));

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
const server = app.listen(PORT, () =>
	console.log(`Servidor corriendo en el puerto ${server.address().port}`)
);
server.on('error', (err) => console.error(`Error en el servidor ${err}`));
