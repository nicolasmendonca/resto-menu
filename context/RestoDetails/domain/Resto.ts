import { RestoId } from './RestoId';
import { ProductList, ProductListPrimitives } from './ProductList';
import { RestoCategory, RestoCategoryPrimitives } from './RestoCategory';

export interface RestoPrimitives {
	id: string;
	name: string;
	imageUrl: string;
	productList: ProductListPrimitives;
	category: RestoCategoryPrimitives;
}

export class Resto {
	constructor(
		public id: RestoId,
		public name: string,
		public imageUrl: string,
		public productList: ProductList,
		private category?: RestoCategory
	) {}

	static fromPrimitives({ id, name, productList, imageUrl, category }: RestoPrimitives) {
		return new Resto(
			id,
			name,
			imageUrl,
			ProductList.fromPrimitives(productList),
			RestoCategory.fromPrimitives(category)
		);
	}

	get categoryName() {
		return this.category?.name;
	}

	get categoryId() {
		return this.category?.id;
	}

	toPrimitives(): RestoPrimitives {
		return {
			category: this.category.toPrimitives(),
			id: this.id,
			imageUrl: this.imageUrl,
			name: this.name,
			productList: this.productList.toPrimitives(),
		};
	}
}
