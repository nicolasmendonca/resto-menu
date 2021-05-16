import React from 'react';
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
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';

import { RestoHeading } from '../components/RestoHeading';
import { RestoPrimitivesMemoryFetchService } from '../context/RestoDetails/infrastructure/RestoPrimitivesMemoryFetchService';
import { fetchRestoPrimitives } from '../context/RestoDetails/application/fetchRestoDetails';
import { Resto, RestoPrimitives } from '../context/RestoDetails/domain/Resto';

interface IndexPageProps {
	restoPrimitives: RestoPrimitives;
}

const IndexPage: React.FC<IndexPageProps> = ({ restoPrimitives }) => {
	const { colorMode } = useColorMode();
	const restoDetails = React.useMemo<Resto>(() => {
		if (!restoPrimitives) return null;

		return Resto.fromPrimitives(restoPrimitives);
	}, [restoPrimitives]);

	return (
		<Box>
			<RestoHeading />
			<Container aria-label="Productos" as="section" py={4}>
				<VisuallyHidden as="h2">Productos</VisuallyHidden>
				{restoDetails?.productList.categories.map((category) => {
					return (
						<React.Fragment key={category.id}>
							<Heading
								as="h3"
								color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
								py={4}
								size="lg"
							>
								{category.name}
							</Heading>
							{category.products.map((product) => {
								return (
									<HStack key={product.id} gap={4} p={2}>
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
								);
							})}
						</React.Fragment>
					);
				})}
			</Container>
			<Divider />
		</Box>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const restoPrimitives = await fetchRestoPrimitives(RestoPrimitivesMemoryFetchService, '1');

	return {
		props: {
			restoPrimitives,
		},
	};
};

export default IndexPage;
