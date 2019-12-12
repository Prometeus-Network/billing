import { Module } from '@nestjs/common';
import { DataMartController } from './dataMart.controller';
import { BuyHandler } from './handlers/buy/buy.handler';
import { DataMartService } from '../../contracts/child_chain/dataMart.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import { TransactionDto } from './services/transaction.dto';
import { TransactionService } from '../../contracts/child_chain/transaction.service'
import { TransactionPayService } from './services/transactionPay.service';
import { AccountService } from '../../contracts/child_chain/account.service';
import { WalletService } from '../../contracts/child_chain/wallet.service'
@Module({
  imports: [],
  controllers: [DataMartController],
  providers: [
  	BuyHandler, 
  	DataMartService, 
  	Web3PrivateNetService, 
  	Web3MainNetService, 
  	AccountService,
  	TransactionService,
    TransactionPayService,
  	WalletService,
  	TransactionDto
  ],
})
export class DataMartModule {}
