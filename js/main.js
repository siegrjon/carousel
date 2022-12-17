async function fetchCategory(category, resultsPerPage) {
	fetch(`https://web-modules.dev/api/v1/products/byCategory/${category}/${resultsPerPage}`, {
		headers: {
			Authorization: 'Bearer 79|cLxjgFnfHUuL0XG0LyapV4h6Z9jJPjIfo3lECk9D' // Part nach "Bearer " mit eigenem Token ersetzen
		}
	})
		.then((resp) => resp.json())
		.then((productData) => {
			console.log(productData)
			console.log(productData.products)
			// console.log(Math.max(...productData.map(o => o.likes),o))
			// productData["products"].forEach(renderOneProduct);
			var byLike = productData.products.slice(0);
			byLike.sort(function(a,b) {
				var x = a.likes_count;
				var y = b.likes_count;
				console.log(x < y ? -1 : x > y ? 1 : 0)
				return x > y ? -1 : x < y ? 1 : 0;
			});
			console.log('byLike:');
			console.log(byLike);
			byLike.forEach(renderOneProduct)
		})
		.catch(error => {
			this.innerText = `Error: ${error}`;
			console.error('There was an error!', error);
		});
}
function renderOneProduct(productData) {

	const li = document.createElement("li");
	li.className = "card";

	const img = document.createElement("img");
	img.className = "thumbnail";
	img.src = productData["image"];
	img.alt = `Image of ${productData["name"]}`;

	const productName = document.createElement("a");
	productName.innerText = productData["name"];
	productName.className = "product-name"
	productName.href = "#"

	const description = document.createElement("p")
	description.innerText = productData["description"]
	description.className = "product-info-top"

	const price = document.createElement("p");
	price.innerText = productData["price"].toFixed(2) + " CHF";
	price.className = "product-price";

	const id = document.createElement("span");
	id.innerText = productData["id"];
	id.className = "hidden";

	const likeCounter = document.createElement("span");
	let likes_count = productData["likes_count"];
	likeCounter.className = "rating"
	likeCounter.id = "rating_" + productData["id"]

	const productInfo = document.createElement("div")
	productInfo.className = "product-info"
	productInfo.appendChild(productName)
	productInfo.appendChild(description)
	productInfo.appendChild(price)
	productInfo.appendChild(likeCounter)

	const content = document.createElement("div")
	content.className = "product-content"
	content.appendChild(img)

	li.append(content, productInfo, id);

	document.querySelector("#card-container").appendChild(li);
}
fetchCategory(1,50)