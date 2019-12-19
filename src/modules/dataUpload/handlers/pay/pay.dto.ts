import { Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class PayDto {
	@IsNotEmpty()
	readonly id: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Data Validator address must be valid Ethereum address"
        }
    )
	readonly data_validator: string;

	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly size: number;

	@IsNotEmpty()
	readonly extension: string;

	@IsNotEmpty()
	readonly mime_type: string;

	readonly meta_data: string;

	@IsNotEmpty()
	@Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "Service node address must be valid Ethereum address"
        }
    )
	readonly service_node: string;

	data_owner: string;

	data_owner_full: any;

	@IsNotEmpty()
	sum: string;

	@IsNotEmpty()
	buy_sum: string;

	coinbase: string;
}
