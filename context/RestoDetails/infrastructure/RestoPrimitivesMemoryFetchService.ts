import { RestoPrimitivesFetchService } from '../application/fetchRestoDetails';
import { RestoPrimitives } from '../domain/Resto';
import { RestoId } from '../domain/RestoId';

const data: Record<string, RestoPrimitives> = {
	'1': {
		id: '1',
		name: 'McDonalds',
		productList: {
			categories: [
				{
					id: '1',
					name: 'Cuarto de Libra Lovers',
					products: [
						{
							description: 'La perfecta combinacion entre tres carnes 100%',
							id: '1',
							imageUrl: '/custom/mcdonalds/Cuarto_de_libra.png',
							name: 'Cuarto de Libra',
							price: 2333,
						},
						{
							description: 'La perfecta combinacion entre tres carnes 100%',
							id: '2',
							imageUrl: '/custom/mcdonalds/Cuarto_de_libra.png',
							name: 'Cuarto de Libra',
							price: 4598,
						},
					],
				},
			],
		},
	} as RestoPrimitives,
};

export const RestoPrimitivesMemoryFetchService: RestoPrimitivesFetchService = (
	restoId: RestoId
) => {
	const restoDetails = data[restoId];

	if (!restoDetails) return Promise.reject(new Error('Resto not found'));

	return Promise.resolve(restoDetails);
};
