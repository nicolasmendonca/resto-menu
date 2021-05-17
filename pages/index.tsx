import React, { Reducer } from 'react';
import produce, { immerable } from 'immer';
import {
	Box,
	Heading,
	VisuallyHidden,
	Image,
	Text,
	HStack,
	Container,
	Divider,
	useColorMode,
	VStack,
	chakra,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';

import { RestoPrimitivesMemoryFetchService } from '../context/RestoDetails/infrastructure/RestoPrimitivesMemoryFetchService';
import { fetchRestoPrimitives } from '../context/RestoDetails/application/fetchRestoDetails';
import { Resto, RestoPrimitives } from '../context/RestoDetails/domain/Resto';
import { Product } from '../context/RestoDetails/domain/Product';

interface IndexPageProps {
	restoPrimitives: RestoPrimitives;
}

const IndexPage: React.FC<IndexPageProps> = ({ restoPrimitives }) => {
	const [cart, dispatch] = React.useReducer(cartReducer, new Cart([]));
	const { colorMode } = useColorMode();
	const restoDetails = React.useMemo<Resto>(() => {
		if (!restoPrimitives) return null;

		return Resto.fromPrimitives(restoPrimitives);
	}, [restoPrimitives]);

	const addProductToCart = (product: Product) =>
		dispatch({
			payload: product,
			type: 'ADD_PRODUCT',
		});

	return (
		<Box>
			<Box borderRadius="md" boxShadow="sm">
				<Image objectFit="contain" src={restoDetails.imageUrl} />
				<Container py={4}>
					<Heading as="h1">{restoDetails.name}</Heading>
					<HStack>
						<Text color="gray" flex={1} size="sm">
							{restoDetails.categoryName}
						</Text>
					</HStack>
				</Container>
			</Box>
			<Box aria-label="Productos" as="section" px={2} py={4}>
				<VisuallyHidden as="h2">Productos</VisuallyHidden>
				{restoDetails?.productList.categories.map((category) => {
					return (
						<React.Fragment key={category.id}>
							<Heading
								as="h3"
								color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
								px={2}
								py={4}
								size="lg"
							>
								{category.name}
							</Heading>
							{category.products.map((product) => {
								return (
									<ProductButton
										key={product.id}
										style={{ textAlign: 'left' }}
										onClick={() => addProductToCart(product)}
									>
										<HStack gap={6} py={2}>
											<VStack alignSelf="flex-start">
												<Box
													as="span"
													bgColor="green.500"
													borderRadius="50%"
													color="white"
													display="inline-block"
													fontSize="14px"
													height="24px"
													lineHeight="24px"
													opacity={cart.hasProduct(product) ? 1 : 0}
													textAlign="center"
													width="24px"
												>
													{cart.countProduct(product)}
												</Box>
											</VStack>
											<Box height="full">
												<Text fontWeight="bold">{product.name}</Text>
												{product.description && (
													<Text color="gray" fontWeight="light">
														{product.description}
													</Text>
												)}
											</Box>
											{product.imageUrl && (
												<Box>
													<Image alt={product.name} src={product.imageUrl} width={120} />
												</Box>
											)}
										</HStack>
									</ProductButton>
								);
							})}
						</React.Fragment>
					);
				})}
			</Box>
			<Divider />
		</Box>
	);
};

class Cart {
	[immerable] = true;

	constructor(public products: Product[]) {}

	addProduct(product: Product) {
		this.products.push(product);
	}

	hasProduct(product: Product) {
		return this.products.findIndex((productInCart) => productInCart.id === product.id) > -1;
	}

	countProduct(product: Product) {
		return this.products.filter((productInCart) => productInCart.id === product.id).length;
	}
}

interface AddProductAction {
	type: 'ADD_PRODUCT';
	payload: Product;
}

type CartReducerActions = AddProductAction;

const cartReducer: Reducer<Cart, CartReducerActions> = produce((state, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			state.addProduct(action.payload);

			return state;
		default:
			return state;
	}
});

const ProductButton = chakra('button', {});

export const getStaticProps: GetStaticProps = async () => {
	const restoPrimitives = await fetchRestoPrimitives(RestoPrimitivesMemoryFetchService, '1');

	return {
		props: {
			restoPrimitives,
		},
	};
};

export default IndexPage;
