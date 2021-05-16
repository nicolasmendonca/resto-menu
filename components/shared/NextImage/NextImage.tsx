import { chakra } from '@chakra-ui/system';
import NextImageBase, { ImageProps } from 'next/image';

interface INextImage {}

export const NextImage: React.FC<INextImage & ImageProps> = chakra(NextImageBase, {
	baseStyle: { maxH: 120, maxW: 120 },
	shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt', 'layout'].includes(prop),
});
