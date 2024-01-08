import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { TransactionDto, NewTransactionDto } from './dto/transaction.dto';
import { select } from './transaction.constants';

@Injectable()
export class TransactionService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: NewTransactionDto): Promise<TransactionDto> {
		const transaction = await this.prisma.transaction.create({ select, data: dto });

		return transaction;
	}

	async update(dto: TransactionDto): Promise<TransactionDto> {
		const transaction = await this.prisma.transaction.update({
			where: {
				id: dto.id,
			},
			select,
			data: {
				name: dto.name,
				price: dto.price,
				categoryId: dto.category.id,
			},
		});

		return transaction;
	}

	async findById(id: string): Promise<TransactionDto> {
		const transaction = await this.prisma.transaction.findUnique({
			where: { id },
			select,
		});

		return transaction;
	}

	async getList(userId: string): Promise<TransactionDto[]> {
		const transactions = await this.prisma.transaction.findMany({
			where: { userId },
			select,
		});

		return transactions;
	}

	async delete(id: string): Promise<boolean> {
		await this.prisma.transaction.delete({ where: { id } });

		return true;
	}
}
