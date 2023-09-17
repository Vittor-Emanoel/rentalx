import { Request, Response } from 'express';

import { ListCategoriesUseCase } from '../listCategories/ListCategoriesUseCase';

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listSpecificationsUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationsController };
