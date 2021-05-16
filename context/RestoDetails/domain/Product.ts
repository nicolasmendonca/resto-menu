import DineroFactory, { Dinero } from 'dinero.js';

export interface ProductPrimitives {
	id: string;
	description: string;
	imageUrl: string;
	name: string;
	price: number;
}

export class Product {
	public id: string;
	public description: string;
	public imageUrl: string;
	public name: string;
	public price: Dinero;

	constructor(id: string, description: string, imageUrl: string, name: string, price: Dinero) {
		this.id = id;
		this.description = description;
		this.imageUrl = imageUrl;
		this.name = name;
		this.price = price;
	}

	static fromPrimitives({ id, description, imageUrl, name, price }: ProductPrimitives) {
		return new Product(
			id,
			description,
			imageUrl,
			name,
			DineroFactory({ amount: price, currency: 'ARS', precision: 2 })
		);
	}

	toPrimitives(): ProductPrimitives {
		return {
			description: this.description,
			id: this.id,
			imageUrl: this.imageUrl,
			name: this.name,
			price: this.price.toUnit(),
		};
	}
}
