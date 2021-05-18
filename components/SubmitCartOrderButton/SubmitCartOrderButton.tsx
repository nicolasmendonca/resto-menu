import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

import { Cart } from '../../context/RestoDetails/application/Cart';

const whatsappFormat = {
	bold: (text: string) => `*${text}*`,
};

const envPhoneNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER as string;
const generateWhatsappMessage = (cart: Cart, phoneNumber = envPhoneNumber) => {
	const messageString = [
		'Hola! Me gustaría hacer el siguiente pedido:',
		'',
		...cart.dedupedProducts.map(
			(product) => `- ${whatsappFormat.bold(product.name)} (${cart.countProduct(product)})`
		),
	].join('\n');

	return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageString)}`;
};

interface SubmitCartOrderButtonProps {
	cart: Cart;
}

export const SubmitCartOrderButton: React.FC<SubmitCartOrderButtonProps> = ({ cart }) => {
	return (
		<Button
			as="a"
			colorScheme="whatsapp"
			href={generateWhatsappMessage(cart)}
			leftIcon={<FaWhatsapp />}
			rel="noopener"
			target="_blank"
			width="full"
		>
			Pedir por Whatsapp
		</Button>
	);
};
