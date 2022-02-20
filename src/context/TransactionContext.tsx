import React, { useEffect, useState, FormEvent } from 'react';
import { ethers } from 'ethers';

import { contractABI, ENV_VARS } from '../utils/constants';
const { CONTRACT_ADDRESS } = ENV_VARS;

type FormData = {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
};

export type StructuredTransaction = {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
};

export type GlobalContext = {
  currentAccount: string;
  formData: FormData;
  transactions: Array<StructuredTransaction>;
  isLoading: boolean;
  transactionCount?: string | null;
  clearForm: boolean;
  sendTransaction: () => void;
  handleChange: (e: FormEvent<HTMLInputElement>, name: string) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const emptyForm = { addressTo: '', amount: '', keyword: '', message: '' };

export const TransactionContext = React.createContext<GlobalContext>({
  currentAccount: '',
  formData: emptyForm,
  transactions: [],
  isLoading: false,
  clearForm: false,
  sendTransaction: () => undefined,
  handleChange: () => undefined,
  connectWallet: () => undefined,
  disconnectWallet: () => undefined,
});

type ContractTransaction = {
  receiver: string;
  sender: string;
  timestamp: ethers.BigNumber;
  message: string;
  keyword: string;
  amount: {
    _hex: string;
  };
};

const { ethereum } = window as any;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [clearForm, setClearForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState<
    Array<StructuredTransaction>
  >([]);

  const handleChange = (e: FormEvent<HTMLInputElement>, name: string): void => {
    const value = e.currentTarget?.value;
    console.log({ formDataInChange: formData });
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const errorHandler = async (fn: Function) => {
    try {
      if (!ethereum) return alert('Please install metamask');
      fn();
    } catch (error) {
      console.log(error);
      throw new Error('no ethereum object.');
    }
  };

  const getAllTransactions = async () => {
    errorHandler(async () => {
      const transactionsContract = getEthereumContract();

      const availableTransactions: Array<ContractTransaction> =
        await transactionsContract.getAllTransactions();

      const structuredTransactions: Array<StructuredTransaction> =
        availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

      setTransactions(structuredTransactions);
    });
  };

  const checkIfTransactionsExists = async () => {
    errorHandler(async () => {
      const transactionsContract = getEthereumContract();
      const currentTransactionCount =
        await transactionsContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', currentTransactionCount);
    });
  };

  const checkIfWalletIsConnected = async () => {
    errorHandler(async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    });
  };

  const connectWallet = async () => {
    errorHandler(async () => {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    });
  };

  const disconnectWallet = async () => setCurrentAccount('');

  const sendTransaction = async () => {
    errorHandler(async () => {
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI (sub unit of ethereum)
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      await transactionHash.wait();
      setIsLoading(false);
      setClearForm(true);

      const transactionsCount =
        await transactionsContract.getTransactionCount();
      setTransactionCount(transactionsCount.toNumber());
      setFormData(emptyForm);
      setClearForm(false);
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        formData,
        transactions,
        isLoading,
        transactionCount,
        clearForm,
        sendTransaction,
        handleChange,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
