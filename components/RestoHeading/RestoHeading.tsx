import React from 'react';
import { Box, Container, Heading, HStack, Icon, Text, Image } from '@chakra-ui/react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface IRestoHeadingProps {}

export const RestoHeading: React.FC<IRestoHeadingProps> = () => {
	return (
		<Box borderRadius="md" boxShadow="sm">
			<Image objectFit="contain" src="/custom/mcdonalds/heading.jpeg" />
			<Container py={4}>
				<Heading as="h1">McDonald{"'"}s</Heading>
				<HStack>
					<Text color="gray" flex={1} size="sm">
						Hamburguesas
					</Text>
					<Icon as={BsStarFill} color="orange" ml={1} />
					<Icon as={BsStarFill} color="orange" ml={1} />
					<Icon as={BsStarFill} color="orange" ml={1} />
					<Icon as={BsStarHalf} color="orange" ml={1} />
					<Icon as={BsStar} color="orange" ml={1} />
				</HStack>
			</Container>
		</Box>
	);
};
