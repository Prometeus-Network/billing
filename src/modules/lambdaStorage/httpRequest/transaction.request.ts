import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import {AxiosResponse} from "axios";
import {TransactionFeeResponse} from "../httpResponse/transactionFee.response";
import {AccountResponse} from "../httpResponse/account.response";
import {WalletTransactionResponse} from "../httpResponse/walletTransaction.response";

@Injectable()
export class TransactionRequest {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    public getAddressTx(address: string): Promise<AxiosResponse<WalletTransactionResponse[]>> {
        return this.httpService.get(`/txs?address=${address}&page=1&limit=1000000000000`, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }

    public calculateTxFee(accountResponse: AccountResponse, amount: string, toAddress: string): Promise<AxiosResponse<TransactionFeeResponse>> {
        return this.httpService.post(`/bank/accounts/${accountResponse.value.address}/transfers`, {
            base_req: {
                sequence: accountResponse.value.sequence,
                from: accountResponse.value.address,
                account_number: accountResponse.value.account_number,
                chain_id: this.configService.get('LAMBDA_CHAIN_ID'),
                simulate: true,
                memo: ""
            },
            amount: [{
                amount: amount,
                denom: "uvoda"
            }],
            from_address: accountResponse.value.address,
            to_address: toAddress
        }, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }

    public transferTo(
        amount: string,
        denom: string,
        fromAddress: string,
        toAddress: string,
        feeAmount: string,
        gas: string,
        signature: string,
        pubKey: string
    ) {
        return this.httpService.post('/txs', {
            tx: {
                msg: [{
                    type: 'cosmos-sdk/MsgSend',
                    value: {
                        amount: [{
                            amount: amount,
                            denom: denom
                        }],
                        from_address: fromAddress,
                        to_address: toAddress
                    }
                }],
                fee: {
                    amount: [{
                        amount: amount,
                        denom: denom
                    }],
                    gas: "35182"
                },
                signatures: [{
                    signature: signature,
                    pub_key: {
                        type: 'tendermint/PubKeySecp256k1',
                        value: pubKey
                    }
                }],
                memo: ""
            },
            mode: 'block'
        }, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }
}
