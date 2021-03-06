import { Injectable } from '@nestjs/common';
import { Web3PrivateNetService } from "../../web3/web3PrivateNet.service";
import { BuyDto } from "../../modules/dataMart/handlers/buy/buy.dto";
import { AccountService } from "./account.service";
import Web3 from "web3";
import { ConfigService } from "../../config/config.service";
import BN = require("bn.js");

@Injectable()
export class DataMartService {
	private web3: Web3;
	private accountService: AccountService;
	private readonly contract;
	private config: ConfigService;

	constructor(
		web3Service: Web3PrivateNetService, 
		accountService: AccountService,
		configService: ConfigService
	) {
		let web3 = web3Service.websocketInstance();
		this.web3 = web3;
		this.accountService = accountService;
		this.config = configService;
		this.contract = new web3.eth.Contract(
			configService.getDataSellAbi(), 
			configService.getDataSellAddress()
		);
	}

	public getContract() {
		return this.contract;
	}

	public sellData(dto: BuyDto, signature: string, msgHash: string): Promise<any> {
		return this.contract.methods.sell(
			dto.id, 
			dto.data_mart, 
			dto.data_validator, 
			dto.service_node, 
			dto.data_owner,
			String(dto.amount),
			signature,
			msgHash
		)
			.send({
				from: dto.coinbase, 
				gas: 6600000,
				gasPrice: 8 * 1e9
			})
	}
}
