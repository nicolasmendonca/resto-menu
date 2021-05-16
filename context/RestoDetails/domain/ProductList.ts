import { Category, CategoryPrimitives } from './Category';

export interface ProductListPrimitives {
	categories: CategoryPrimitives[];
}

export class ProductList {
	public categories: Category[];
	constructor(categories: Category[]) {
		this.categories = categories;
	}

	static fromPrimitives({ categories }: ProductListPrimitives) {
		return new ProductList(categories.map(Category.fromPrimitives));
	}

	toPrimitives(): ProductListPrimitives {
		return {
			categories: this.categories.map((category) => category.toPrimitives()),
		};
	}
}
