import { Category } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

const adaptToDto = (category: Category): CategoryDto => {
	const dto = { ...category };

	delete dto.userId;

	return new CategoryDto(dto);
};

export class CategoryDto {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	createdAt: Date;

	constructor(category?: Omit<Category, 'userId'>) {
		if (category) {
			this.id = category.id;
			this.name = category.name;
			this.createdAt = category.createdAt;
		}
	}

	static adaptToDto = adaptToDto;
}

export class NewCategoryDto {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsString()
	name: string;
}
