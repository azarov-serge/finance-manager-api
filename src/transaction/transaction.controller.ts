import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	NotFoundException,
	InternalServerErrorException,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AccessTokenGuard } from '@common/guards/access-token.guard';

import { TRANSACTION_NOT_FOUND } from './transaction.constants';
import { TransactionService } from './transaction.service';
import { TransactionDto, NewTransactionDto, DeletedTransactionyDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(AccessTokenGuard)
	@Post('')
	async create(@Body() dto: NewTransactionDto): Promise<TransactionDto> {
		try {
			const transaction = await this.transactionService.create(dto);

			return transaction;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(AccessTokenGuard)
	@Patch('')
	async update(@Body() dto: TransactionDto): Promise<TransactionDto> {
		try {
			const transaction = this.transactionService.findById(dto.id);

			if (!transaction) {
				throw new NotFoundException(TRANSACTION_NOT_FOUND);
			}

			return await this.transactionService.update(dto);
		} catch (error: any) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(TRANSACTION_NOT_FOUND);
			}

			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}
	@UseGuards(AccessTokenGuard)
	@Get(':id')
	async get(@Param('id') id: string): Promise<TransactionDto> {
		try {
			const transaction = this.transactionService.findById(id);

			if (!transaction) {
				throw new NotFoundException(TRANSACTION_NOT_FOUND);
			}

			return transaction;
		} catch (error: any) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(TRANSACTION_NOT_FOUND);
			}

			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UseGuards(AccessTokenGuard)
	@Get('get-list/:userId')
	async getList(@Param('userId') userId: string): Promise<TransactionDto[]> {
		try {
			const transactions = await this.transactionService.getList(userId);

			return transactions;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}

	@UseGuards(AccessTokenGuard)
	@Delete('')
	async delete(@Body() dto: DeletedTransactionyDto): Promise<boolean> {
		try {
			const isDeleted = await this.transactionService.delete(dto.ids);

			return isDeleted;
		} catch (error: any) {
			throw new InternalServerErrorException(error?.message || `${error}`);
		}
	}
}
