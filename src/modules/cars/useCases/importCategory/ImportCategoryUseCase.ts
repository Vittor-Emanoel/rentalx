import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { parse } from 'csv-parse';
import fs from 'node:fs';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file?.path);
      const categories: Array<IImportCategory> = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on('data', async line => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      });
      parseFile.on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      });
      parseFile.on('error', err => {
        reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
