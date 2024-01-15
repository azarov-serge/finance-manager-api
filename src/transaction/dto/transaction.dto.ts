import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsOptional,
	IsArray,
	ArrayNotEmpty,
} from 'class-validator';
import { CategoryDto } from '../../category/dto/category.dto';

export class TransactionDto {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	category: CategoryDto | null;
}

export class NewTransactionDto {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsOptional()
	@IsString()
	categoryId: string | null;
}

export class DeletedTransactionyDto {
	@IsArray()
	@IsString({ each: true })
	@ArrayNotEmpty()
	ids: string[];
}
