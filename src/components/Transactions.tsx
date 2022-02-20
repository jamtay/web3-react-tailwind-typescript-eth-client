import { useContext, ReactElement, PropsWithChildren } from 'react';

import {
  TransactionContext,
  StructuredTransaction,
} from '../context/TransactionContext';

import useFetch from '../hooks/useFetch';
import { shortenAddress } from '../utils/shortenAddress';

type PrefixTextProps = {
  prefixText: string;
};
type CardLinkProps = {
  address: string;
  prefixText: string;
};

type CardTextProps = PropsWithChildren<PrefixTextProps>;

const cardItemClass = 'justify-between flex flex-wrap';

const PrefixText = ({ prefixText }: PrefixTextProps): ReactElement => (
  <span className="text-white text-xl">{prefixText}</span>
);

const CardLink = ({ address, prefixText }: CardLinkProps): ReactElement => (
  <a
    href={`https://ropsten.etherscan.io/address/${address}`}
    target="_blank"
    rel="noreferrer"
    className={cardItemClass}
  >
    <PrefixText prefixText={prefixText} />
    <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
      {shortenAddress(address)}
    </span>
  </a>
);

const CardText = ({ children, prefixText }: CardTextProps): ReactElement => (
  <div className={cardItemClass}>
    <PrefixText prefixText={prefixText} />
    {children}
  </div>
);

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  keyword,
}: StructuredTransaction): ReactElement => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-slate-800 m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-[2rem] hover:shadow-2xl hover:animate-pulse"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="justify-start w-full mb-6 p-2 transactions__card--flex-between">
          <CardLink address={addressFrom} prefixText="From: " />
          <CardLink address={addressTo} prefixText="To: " />
          <CardText prefixText="Amount: ">
            <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
              {amount} ETH
            </span>
          </CardText>
          {message && (
            <CardText prefixText="Message: ">
              <span className="text-white mr-3">{message}</span>
            </CardText>
          )}
        </div>
        <img
          src={gifUrl}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-[2rem] shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);
  const transactionsToDisplay = currentAccount
    ? [...transactions].reverse()
    : [];

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          {currentAccount
            ? 'Latest Transactions'
            : 'Connect your account to see the latest transactions'}
        </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactionsToDisplay.map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
