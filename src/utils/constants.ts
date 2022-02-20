import transactionsJson from './Transactions.json';

export const contractABI = transactionsJson.abi;
export const contractAddress = '0xbF1fC07b996d45c74498c553A63016A7103d91f4';

export const PAGE_NAMES = ['Market', 'Exchange', 'Wallets'];

export const ENV_VARS = {
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS,
  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
};
