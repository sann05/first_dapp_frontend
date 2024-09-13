import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano, fromNano } from "@ton/core";



export function useMainContract() {
    const client = useTonClient();
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
    
    const [contractData, setContractData] = useState<null | {
        counterValue: number,
        mostRecentSender: Address,
        ownerAddress: Address,
    } >();

    const [balance, setBalance] = useState<null | number>(0);



    const mainContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new MainContract(Address.parse("EQAYdbm4IMz9PzCi8D164t1dskUQa1T110SAfYcBxSVXGxrg"));
        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
        if (!mainContract) return;
        setContractData(null);
        const val = await mainContract.getData();
        const balance = await mainContract.getBalance();
        setContractData({
            counterValue: val.counter,
            mostRecentSender: val.mostRecentSender,
            ownerAddress: val.ownerAddress,
        });
        setBalance(Number(fromNano(balance)));
        await sleep(10000); // 10 seconds and poll value again
        getValue();
    }
    getValue();
    }, [mainContract]);

    return {
        contractAddress: mainContract?.address.toString(),
        balance: balance,
        ...contractData,
        sendIncrement: async (by: number) => {
            return mainContract?.sendIncrement(
                sender,
                toNano(by),
                5
            );

        },
        sendDeposit: async (amount: number) => {
            return mainContract?.sendDeposit(
                sender,
                toNano(amount)
            );
        },
        sendWithdraw: async (amount: number) => {
            return mainContract?.sendWithdraw(
                sender,
                toNano(amount),
                toNano(0.05)
            );
        }
    };
}
    