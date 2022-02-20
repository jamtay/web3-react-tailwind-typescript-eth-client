# Web3 React application

This application is a web3 application developed using react, typescript and solidity. Connect your wallet, send ethereum transactions including a reference to a gif, display latest transactions including the gif.

# Demo - TODO: Upload actual videos

[![Login demo](demo/Login.mov)](demo/Login.mov)

[![Transaction demo](demo/Transaction.mov)](demo/Transaction.mov)

# Setup

- Setup smart contract: **TBC - add once pushed**
- Create metamask account: https://metamask.io/
- Install secret scanner: `brew install git-secrets`. More info at https://github.com/awslabs/git-secrets
- Add common AWS patterns to the git config : `git secrets --register-aws --global`
- Setup environment variable: `export VITE_GIPHY_API_KEY=<giphyApiKey`. More info https://developers.giphy.com/docs/api#quick-start-guide.
- Setup environment variable: `export VITE_CONTRACT_ADDRESS=<contractAddress>` **TBC - how to generate**
- Setup src/utils/Transactions.json: **TBC - how to generate**
- Run: `npm install`
- Run: `npm run dev`

# Extra tools

- Vite
- TailwindCSS
- Husky, lint-staged, prettier, eslint and git-secrets
- Solidity contract can be found here **TBC - add once pushed**

# Initial tutorial code

- https://github.com/adrianhajdin/project_web3.0

# Additional features

- Improved styling and content
- Error handling for transactions
- Linting, husky and secret scanning
- Disconnect wallet
- More to follow
