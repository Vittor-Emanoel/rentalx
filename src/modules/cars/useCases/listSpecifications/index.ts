import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';

import { ListCategoriesController } from '../listCategories/ListCategoriesControllers';
import { ListCategoriesUseCase } from '../listCategories/ListCategoriesUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();

const listSpecificationsUseCase = new ListCategoriesUseCase(
  specificationsRepository,
);
const listSpecificationsController = new ListCategoriesController(
  listSpecificationsUseCase,
);

export { listSpecificationsController };
