import { Specification } from '@modules/cars/model/Specification';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute(): Array<Specification> {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
