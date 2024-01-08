export const TRANSACTION_NOT_FOUND = 'Транзакция не найдена';

export const select = {
	id: true,
	createdAt: true,
	name: true,
	price: true,
	category: { select: { id: true, createdAt: true, name: true } },
};
