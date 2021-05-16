import { RestoPrimitives } from '../domain/Resto';
import { RestoId } from '../domain/RestoId';

export type RestoPrimitivesFetchService = (restoId: RestoId) => Promise<RestoPrimitives>;

export const fetchRestoPrimitives = async (
	restoDetailsFetchService: RestoPrimitivesFetchService,
	restoId: RestoId
): Promise<RestoPrimitives> => restoDetailsFetchService(restoId);
