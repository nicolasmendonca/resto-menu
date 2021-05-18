import React from 'react';
import {
	Box,
	Button,
	Center,
	chakra,
	Container,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Heading,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorMode,
	VisuallyHidden,
	VStack,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';

import { RestoPrimitivesMemoryFetchService } from '../context/RestoDetails/infrastructure/RestoPrimitivesMemoryFetchService';
import { fetchRestoPrimitives } from '../context/RestoDetails/application/fetchRestoDetails';
import { Resto, RestoPrimitives } from '../context/RestoDetails/domain/Resto';
import { Product } from '../context/RestoDetails/domain/Product';
import { Cart } from '../context/RestoDetails/application/Cart';
import { cartReducer } from '../context/RestoDetails/application/cartReducer';
import { AddProductCard } from '../components/AddProductCard';
import { CartSummary } from '../components/CartSummary/CartSummary';
import { ProductCount } from '../components/shared/ProductCount';
import { SubmitCartOrderButton } from '../components/SubmitCartOrderButton/SubmitCartOrderButton';

interface IndexPageProps {
	restoPrimitives: RestoPrimitives;
}

const IndexPage: React.FC<IndexPageProps> = ({ restoPrimitives }) => {
	// Stores the product state that the user is trying to add to the cart
	const [activeProductAdd, setActiveProductAdd] = React.useState<Product | undefined>(undefined);

	// The drawer contains the CartSummary
	const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState<boolean>(false);
	const isAddProductCardModalOpen = activeProductAdd !== undefined;
	const [cart, dispatch] = React.useReducer(cartReducer, new Cart([]));
	const { colorMode } = useColorMode();
	const restoDetails = React.useMemo<Resto>(() => {
		if (!restoPrimitives) return null;

		return Resto.fromPrimitives(restoPrimitives);
	}, [restoPrimitives]);

	const setProductQuantity = (product: Product, quantity: number) => {
		dispatch({
			payload: { product, quantity },
			type: 'SET_PRODUCT_QUANTITY',
		});
	};

	const handleAddProductModalDismissed = () => {
		setActiveProductAdd(undefined);
	};

	const handleProductQuantitySaved = (quantity: number) => {
		setProductQuantity(activeProductAdd, quantity);
		setActiveProductAdd(undefined);
	};

	const handleGoToCartClicked = () => {
		setIsCartDrawerOpen(true);
	};

	const handleCartDrawerClosed = () => {
		setIsCartDrawerOpen(false);
	};

	const handleProductQuantityEditClicked = (product: Product) => {
		setActiveProductAdd(product);
	};

	return (
		<Box pb={16} position="relative">
			<Box borderRadius="md" boxShadow="sm">
				<Image objectFit="contain" src={restoDetails.imageUrl} width="full" />
				<Box p={4}>
					<Container maxW="container.lg">
						<Heading as="h1">{restoDetails.name}</Heading>
						<HStack>
							<Text color="gray" flex={1} size="sm">
								{restoDetails.categoryName}
							</Text>
						</HStack>
					</Container>
				</Box>
			</Box>
			<Box aria-label="Productos" as="section" px={2} py={4}>
				<VisuallyHidden as="h2">Productos</VisuallyHidden>
				{restoDetails?.productList.categories.map((category) => {
					return (
						<Container key={category.id} maxW="container.lg">
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
								const productInCartCount = cart.countProduct(product);
								const isProductInCart = productInCartCount > 0;

								return (
									<ProductButton
										key={product.id}
										style={{ textAlign: 'left' }}
										width="full"
										onClick={() => setActiveProductAdd(product)}
									>
										<HStack gap={6} py={2} width="full">
											<VStack alignSelf="flex-start">
												<Box opacity={isProductInCart ? 1 : 0} width="24px">
													<ProductCount>{productInCartCount}</ProductCount>
												</Box>
											</VStack>
											<Box alignSelf="flex-start" flex="1">
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
						</Container>
					);
				})}
			</Box>
			<Divider />
			{cart.cartProductsCount > 0 && (
				<Center width="100vw">
					<Button
						bgColor="orange.400"
						bottom={12}
						color="white"
						position="fixed"
						px={6}
						size="lg"
						onClick={handleGoToCartClicked}
					>
						Ir al carrito
					</Button>
				</Center>
			)}
			<Modal isOpen={isAddProductCardModalOpen} onClose={handleAddProductModalDismissed}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{activeProductAdd?.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{activeProductAdd && (
							<AddProductCard
								key={activeProductAdd.id}
								initialQuantityValue={cart.countProduct(activeProductAdd)}
								product={activeProductAdd}
								onDismiss={handleAddProductModalDismissed}
								onProductQuantitySaved={handleProductQuantitySaved}
							/>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
			<Drawer isOpen={isCartDrawerOpen} placement="right" onClose={handleCartDrawerClosed}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Mi Carrito</DrawerHeader>
					<DrawerBody>
						<CartSummary
							cart={cart}
							onProductQuantityEditButtonClicked={handleProductQuantityEditClicked}
						/>
					</DrawerBody>
					<DrawerFooter>
						<SubmitCartOrderButton cart={cart} />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

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
