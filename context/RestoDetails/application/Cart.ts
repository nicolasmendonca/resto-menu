import { immerable } from 'immer';

import { Product } from '../domain/Product';

export class Cart {
	[immerable] = true;
	constructor(public products: Product[]) {}

	get cartProductsCount() {
		return this.products.length;
	}

	get dedupedProducts() {
		const productIdsSet = this.products.reduce(
			(productIds, product) => productIds.add(product.id),
			new Set<string>()
		);

		const dedupedProductsArray: Product[] = [];

		productIdsSet.forEach((productId) => {
			dedupedProductsArray.push(this.products.find((product) => product.id === productId));
		});

		return dedupedProductsArray;
	}

	addProduct(product: Product) {
		this.products.push(product);
	}

	setProductQuantity(product: Product, quantity: number) {
		const filteredProducts = this.products.filter(
			(productInCart) => productInCart.id !== product.id
		);

		this.products = filteredProducts.concat(
			Array(quantity)
				.fill('')
				.map(() => product)
		);
	}

	removeProduct(product) {
		const productIndex = this.products.findIndex(
			(productInCart) => productInCart.id === product.id
		);

		if (productIndex === -1) throw new Error('Product not found');
		this.products.splice(productIndex, 1);
	}

	countProduct(product: Product) {
		return this.products.filter((productInCart) => productInCart.id === product.id).length;
	}
}
