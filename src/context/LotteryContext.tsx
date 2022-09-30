import React, { useState, useEffect, ChangeEvent } from "react";
import { ethers } from "ethers";

import { contarctABI, contractAddress } from "../utils";
interface FormTypes {
  amount: string;
  address: string;
}
interface ContextTypes {
  connectWallet: () => void;
  connectedAccount: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: FormTypes;
  handleReset: () => void;
  sendFunds: () => void;
  isLoading: boolean;
}
export const LotteryContext = React.createContext<Partial<ContextTypes>>({});

// @ts-ignore
const { ethereum } = window;
const getEthereumContarct = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContarct = new ethers.Contract(
    contractAddress,
    contarctABI,
    signer
  );
  console.log({
    transactionContarct,
  });
  return {
    provider,
    signer,
    transactionContarct,
  };
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const LotteryProvider = ({ children }: Props) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormTypes>({
    address: "",
    amount: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
  };
  const handleReset = () => {
    setFormData({
      address: "",
      amount: "",
    });
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        setConnectedAccount("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");
      await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      alert(error);
    }
  };

  // SEND FUNDS

  const sendFunds = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");
      const { provider, signer, transactionContarct } = getEthereumContarct();

      // Note: this is a string, e.g. user input
      const parsedAmount = ethers.utils.parseEther("0.05");
      console.log(parsedAmount, parsedAmount._hex);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: transactionContarct.address,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionContarct.fundToLottery(
        formData.address,
        parsedAmount
      );
      const players = await transactionContarct.getListOfPlayers();
      console.log(players);

      setIsLoading(true);
      console.log(`Loading, ${JSON.stringify(transactionHash)}`);
      await transactionHash.wait();

      setIsLoading(false);
      alert(`Succesfully transfered`);
    } catch ({ message }) {
      alert(message);
    }
  };
  // END
  useEffect(() => {
    const interval = setInterval(checkIfWalletIsConnected, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <LotteryContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        handleChange,
        values: formData,
        handleReset,
        sendFunds,
        isLoading,
      }}
    >
      {children}
    </LotteryContext.Provider>
  );
};
