import { Controller, Get, Query, Post, HttpStatus, Res, Body, Put, Param, Delete } from '@nestjs/common';
import { WalletFetcher } from './fetcher/wallet.fetcher';
import { DepositHandler } from './handlers/deposit/deposit.handler';
import { ExtendFileStoreHandler } from './handlers/extendFileStore/extendFileStore.handler';
import { ExtendFileStoreDto } from './handlers/extendFileStore/extendFileStore.dto';
import { TransferHandler } from './handlers/transfer/transfer.handler';
import { TransferDto } from './handlers/transfer/transfer.dto';

@Controller('wallet')
export class WalletController {
	private fetcher: WalletFetcher;
	private handler: DepositHandler;
	private extendFileStoreHandler: ExtendFileStoreHandler;
	private transferHandler: TransferHandler;

	constructor(
		fetcher: WalletFetcher, 
		handler: DepositHandler, 
		extendFileStoreHandler: ExtendFileStoreHandler,
		transferHandler: TransferHandler
	) {
		this.fetcher = fetcher;
		this.handler = handler;
		this.extendFileStoreHandler = extendFileStoreHandler;
		this.transferHandler = transferHandler;
	}

	@Get('balance/:address')
	async balance(@Param('address') address: string) { 
		return await this.fetcher.balance(address);
	}

	@Get('deposit/:address/:amount')
	async deposit(@Param('address') address: string, @Param('amount') amount: string) {
		await this.handler.handle(address, amount);
		return {"status": "success"};
	}

	@Post('extend/file/store')
	async extendFileStore(@Body() extendFileStoreDto: ExtendFileStoreDto) {
		await this.extendFileStoreHandler.extendFileStore(extendFileStoreDto);
		return {"status": "success"};
	}

	@Post('transfer')
	async transfer(@Body() transferDto: TransferDto) {
		console.log('Started: ', transferDto);
		await this.transferHandler.handle(transferDto);
		return {"status": "success"};
	}
}
