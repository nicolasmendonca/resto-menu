import { Product, ProductPrimitives } from './Product';

export interface CategoryPrimitives {
	id: string;
	name: string;
	products: ProductPrimitives[];
}

export class Category {
	public id: string;
	public name: string;
	public products: Product[];

	constructor(id: string, name: string, products: Product[]) {
		this.id = id;
		this.name = name;
		this.products = products;
	}

	static fromPrimitives({ id, name, products }: CategoryPrimitives) {
		return new Category(id, name, products.map(Product.fromPrimitives));
	}

	toPrimitives(): CategoryPrimitives {
		return {
			id: this.id,
			name: this.name,
			products: this.products.map((product) => product.toPrimitives()),
		};
	}
}
