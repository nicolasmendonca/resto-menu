import React from 'react';
import { Box, ChakraProps } from '@chakra-ui/react';

interface ProductCountProps extends ChakraProps {}

export const ProductCount: React.FC<ProductCountProps> = ({ children, ...props }) => {
	return (
		<Box
			as="span"
			bgColor="green.500"
			borderRadius="50%"
			color="white"
			display="inline-block"
			fontSize="14px"
			height="24px"
			lineHeight="24px"
			textAlign="center"
			width="24px"
			{...props}
		>
			{children}
		</Box>
	);
};
