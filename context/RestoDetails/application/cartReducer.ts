import produce from 'immer';
import { Reducer } from 'react';

import { Product } from '../domain/Product';

import { Cart } from './Cart';

interface AddProductAction {
	type: 'ADD_PRODUCT';
	payload: Product;
}

interface RemoveProductAction {
	type: 'REMOVE_PRODUCT';
	payload: Product;
}

interface SetProductQuantityAction {
	type: 'SET_PRODUCT_QUANTITY';
	payload: {
		product: Product;
		quantity: number;
	};
}

type CartReducerActions = AddProductAction | RemoveProductAction | SetProductQuantityAction;

export const cartReducer: Reducer<Cart, CartReducerActions> = produce((state, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			state.addProduct(action.payload);

			return state;
		case 'REMOVE_PRODUCT':
			state.removeProduct(action.payload);

			return state;

		case 'SET_PRODUCT_QUANTITY':
			const { product, quantity } = action.payload;

			state.setProductQuantity(product, quantity);

			return state;
		default:
			return state;
	}
});
