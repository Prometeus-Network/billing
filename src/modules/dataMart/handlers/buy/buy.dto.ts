import { IsEmail, IsNotEmpty } from 'class-validator';

export class BuyDto {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	readonly owner: string;

	@IsNotEmpty()
	readonly data_validator: string;

	@IsNotEmpty()
	readonly service_node: string;

	@IsNotEmpty()
	readonly data_owner: string;

	@IsNotEmpty()
	sum: string;

	coinbase: string;
}