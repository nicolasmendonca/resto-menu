import React from 'react';
import { Box, List, ListItem, IconButton, Text, HStack } from '@chakra-ui/react';
import { RiPencilFill } from 'react-icons/ri';

import { Cart } from '../../context/RestoDetails/application/Cart';
import { ProductCount } from '../shared/ProductCount';
import { Product } from '../../context/RestoDetails/domain/Product';

interface CartSummaryProps {
	cart: Cart;
	onProductQuantityEditButtonClicked: (product: Product) => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
	cart,
	onProductQuantityEditButtonClicked,
}) => {
	return (
		<Box>
			<List>
				{cart.dedupedProducts.map((product) => {
					return (
						<ListItem key={product.id}>
							<HStack justify="space-between" width="full">
								<Text>
									<ProductCount mr={4}>{cart.countProduct(product)}</ProductCount>
									{product.name}
								</Text>
								<IconButton
									aria-label="Editar cantidad"
									colorScheme="red"
									icon={<RiPencilFill aria-hidden={true} />}
									variant="ghost"
									onClick={() => onProductQuantityEditButtonClicked(product)}
								/>
							</HStack>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};
