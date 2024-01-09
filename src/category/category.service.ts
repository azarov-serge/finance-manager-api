import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CategoryDto, NewCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: NewCategoryDto): Promise<CategoryDto> {
		const category = await this.prisma.category.create({ data: dto });

		return CategoryDto.adaptToDto(category);
	}

	async update(dto: CategoryDto): Promise<CategoryDto> {
		const category = await this.prisma.category.update({
			where: {
				id: dto.id,
			},
			data: dto,
		});

		return CategoryDto.adaptToDto(category);
	}

	async findById(id: string): Promise<CategoryDto> {
		const category = await this.prisma.category.findUnique({ where: { id } });

		return CategoryDto.adaptToDto(category);
	}

	async getList(userId: string): Promise<CategoryDto[]> {
		const categories = await this.prisma.category.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'asc',
			},
		});

		return categories.map(CategoryDto.adaptToDto);
	}

	async delete(id: string): Promise<boolean> {
		await this.prisma.category.delete({ where: { id } });

		return true;
	}
}
