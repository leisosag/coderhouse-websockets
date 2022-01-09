let socket = io.connect();

socket.on('products', function (data) {
	console.log('data', data);
	render(data);
});

const render = (data) => {
	let html = data
		.map((item) => {
			return `
				<tr>
					<td>${item.product.name}</td>
					<td>${item.product.price}</td>
					<td class='table-image'><img class='img-thumbnail' src='${item.product.thumbnail}' alt='image'/></td>
				</tr>
			`;
		})
		.join(' ');
	document.getElementById('products').innerHTML = html;
};

const addProduct = (e) => {
	let product = {
		name: document.getElementById('name').value,
		price: document.getElementById('price').value,
		thumbnail: document.getElementById('thumbnail').value,
	};
	socket.emit('new-product', product);
	return false;
};
