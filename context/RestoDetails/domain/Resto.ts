import { RestoId } from './RestoId';
import { ProductList, ProductListPrimitives } from './ProductList';

export interface RestoPrimitives {
	id: string;
	name: string;
	productList: ProductListPrimitives;
}

export class Resto {
	public id: RestoId;
	public name: string;
	public productList: ProductList;

	constructor(id: RestoId, name: string, productList: ProductList) {
		this.id = id;
		this.name = name;
		this.productList = productList;
	}

	static fromPrimitives({ id, name, productList }: RestoPrimitives) {
		return new Resto(id, name, ProductList.fromPrimitives(productList));
	}

	toPrimitives(): RestoPrimitives {
		return {
			id: this.id,
			name: this.name,
			productList: this.productList.toPrimitives(),
		};
	}
}
