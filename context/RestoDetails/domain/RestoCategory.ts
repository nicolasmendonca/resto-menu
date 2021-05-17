export interface RestoCategoryPrimitives {
	id: string;
	name: string;
}

export class RestoCategory {
	constructor(public id: string, public name: string) {}

	static fromPrimitives({ id, name }: RestoCategoryPrimitives): RestoCategory {
		return new RestoCategory(id, name);
	}

	toPrimitives(): RestoCategoryPrimitives {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
