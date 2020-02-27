import { Module, HttpModule } from '@nestjs/common';
import { DataUploadController } from './dataUpload.controller';
import { PayHandler } from './handlers/pay/pay.handler';
import { DataUploadService } from '../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
// import { TransactionDto } from '../../contracts/child_chain/dto/transaction.dto';
import { TransactionService } from '../../contracts/child_chain/transaction.service';
import { WalletService } from '../../contracts/child_chain/wallet.service';
import { TransactionDto } from './services/transaction.dto';
import { TransactionPayService } from './services/transactionPay.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:3005'
    })
  ],
  controllers: [DataUploadController],
  providers: [
  	PayHandler, 
  	DataUploadService, 
  	Web3MainNetService, 
  	Web3PrivateNetService, 
  	AccountService, 
    TransactionService,
  	TransactionPayService,
    TransactionDto,
  	WalletService
  ],
})
export class DataUploadModule {}
