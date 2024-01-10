import {
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { AccessTokenGuard } from '@common/guards/access-token.guard';

import { CategoryService } from './category.service';
import { CATEGORY_NOT_FOUND } from './category.constants';
import { CategoryDto, DeletedCategoryDto, NewCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(AccessTokenGuard)
	@Post('')
	async create(@Body() dto: NewCategoryDto): Promise<CategoryDto> {
		try {
			const category = await this.categoryService.create(dto);

			return category;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(AccessTokenGuard)
	@Patch('')
	async update(@Body() dto: CategoryDto): Promise<CategoryDto> {
		try {
			const category = this.categoryService.findById(dto.id);

			if (!category) {
				throw new NotFoundException(CATEGORY_NOT_FOUND);
			}

			const updatedCategory = await this.categoryService.update(dto);

			return updatedCategory;
		} catch (error: any) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(CATEGORY_NOT_FOUND);
			}

			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UseGuards(AccessTokenGuard)
	@Get(':id')
	async get(@Param('id') id: string): Promise<CategoryDto> {
		try {
			const category = await this.categoryService.findById(id);

			if (!category) {
				throw new NotFoundException(CATEGORY_NOT_FOUND);
			}

			return category;
		} catch (error: any) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(CATEGORY_NOT_FOUND);
			}

			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UseGuards(AccessTokenGuard)
	@Get('get-list/:userId')
	async getList(@Param('userId') userId: string): Promise<CategoryDto[]> {
		// throw new InternalServerErrorException();
		try {
			const categorys = await this.categoryService.getList(userId);

			return categorys;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(AccessTokenGuard)
	@Delete('')
	async delete(@Body() dto: DeletedCategoryDto): Promise<boolean> {
		try {
			const isDeleted = await this.categoryService.delete(dto.ids);

			return isDeleted;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}
}
