import React, { FormEvent } from 'react';
import { Box, Button, HStack, Image, Input, Text, useNumberInput } from '@chakra-ui/react';

import { Product } from '../../context/RestoDetails/domain/Product';

interface AddProductCardProps {
	product: undefined | Product;
	onDismiss: () => void;
	initialQuantityValue?: number;
	onProductQuantitySaved: (quantity: number) => void;
}

export const AddProductCard: React.FC<AddProductCardProps> = ({
	onProductQuantitySaved,
	product,
	onDismiss,
	initialQuantityValue,
}) => {
	const { getDecrementButtonProps, getIncrementButtonProps, getInputProps, valueAsNumber } =
		useNumberInput({
			defaultValue: initialQuantityValue || 1,
			min: 0,
			name: 'quantity',
			precision: 0,
			step: 1,
		});

	const incrementButtonProps = getIncrementButtonProps();
	const decrementButtonProps = getDecrementButtonProps();
	const inputProps = getInputProps({ 'aria-label': 'Cantidad' });

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onProductQuantitySaved(valueAsNumber);
	};

	return (
		<Box as="form" onSubmit={handleSubmit}>
			<Image alt={product.name} py={4} src={product.imageUrl} />
			<Text fontSize="lg">{product.description}</Text>
			<HStack my={4} width="100%">
				<Button
					colorScheme="orange"
					size="md"
					variant="outline"
					width={14}
					{...decrementButtonProps}
				>
					-
				</Button>
				<Input flex={1} size="md" {...inputProps} textAlign="center" />
				<Button
					colorScheme="orange"
					size="md"
					variant="outline"
					width={14}
					{...incrementButtonProps}
				>
					+
				</Button>
			</HStack>
			<HStack width="100%">
				<Button flex={1} size="lg" type="button" onClick={onDismiss}>
					Cancelar
				</Button>
				<Button colorScheme="orange" flex={1} size="lg" type="submit">
					Guardar
				</Button>
			</HStack>
		</Box>
	);
};
