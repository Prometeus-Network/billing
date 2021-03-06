import { Injectable, BadRequestException } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { TransactionService as TransactionContract } from '../../../contracts/child_chain/transaction.service';
@Injectable()
export class TransactionPayService {
	private transactionContract: TransactionContract;

	constructor(transactionContract: TransactionContract) {
		this.transactionContract = transactionContract;
	}

	public async push(dto: TransactionDto): Promise<any> {
		return this.transactionContract.transactionDataUpload(
			dto.uuid,
			dto.hash,
			dto.serviceNode,
			dto.dataValidator,
			dto.dataOwner,
			dto.value,
			dto.coinbase
		);
	}
}
