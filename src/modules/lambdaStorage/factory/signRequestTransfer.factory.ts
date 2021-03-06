import {Injectable} from "@nestjs/common";
import {AccountResponse} from "../httpResponse/account.response";
import {TransactionFeeResponse} from "../httpResponse/transactionFee.response";
import {ConfigService} from "../../../config/config.service";
import {BIP32Interface} from "bip32/types/bip32";

export interface SignRequestToTransfer {
    account_number: string,
    chain_id: string,
    fee: {
        amount: [{
            amount: string,
            denom: string
        }],
        gas: string
    },
    memo: string,
    msgs: [{
        type: string,
        value: {
            amount: [{
                amount: string,
                denom: string
            }],
            from_address: string,
            to_address: string
        }
    }],
    sequence: string
}

@Injectable()
export class SignRequestTransferFactory {
    constructor(private readonly config: ConfigService) {}

    public build(
        accountNumber: string,
        chainId: string,
        amount: string,
        denom: string,
        gas: string,
        fromAddress: string,
        toAddress: string,
        sequence: string
    ): SignRequestToTransfer {
        return {
            account_number: accountNumber,
            chain_id: chainId,
            fee: {
                amount: [{
                    amount: amount,
                    denom: denom
                }],
                gas: "35182"
            },
            memo: '',
            msgs: [{
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
            sequence: sequence
        };
    }
}
