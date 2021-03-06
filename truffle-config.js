const secrets          = require('./.secrets.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config           = require('./btrust-config.js')

/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('truffle-hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: process.env.PORT || 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      networkCheckTimeout: 100000,
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97, // Testnet Binanc Smart Chain id
      confirmations: 2,   // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,  // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    bsc: {
      provider: () => new HDWalletProvider(secrets.deployerMnemonicBSC, `https://bsc-dataseed1.binance.org`),
      network_id: 56, // Binanc Smart Chain id
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false,  // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    ropsten: {
      networkCheckTimeout: 100000,
      provider: () => new HDWalletProvider(secrets.deployerMnemonicRopsten, `https://ropsten.infura.io/v3/${secrets.infuraProjectIDRopstein}`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    mainnet: {
      networkCheckTimeout: 100000,
      provider: () => new HDWalletProvider(secrets.deployerMnemonicMainnet, `https://ropsten.infura.io/v3/${secrets.infuraProjectIDinfuraProjectIDMainnet}`),
      network_id: 1,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false,     // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    matic: {
      provider: () => new HDWalletProvider(secrets.deployeerMnemonicMaticTestnet, `https://rpc-mumbai.matic.today`),
      network_id: 80001, // Testnet Matic id
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,  // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    matic: {
      provider: () => new HDWalletProvider(secrets.deployeerMnemonicMaticTestnet, `https://rpc-mainnet.matic.network`),
      network_id: 137, // Matic mainnet id
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,  // Skip dry run before migrations? (default: false for public nets )
      from: config.foundationInitialAddress
    },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.3",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
        enabled: false,
        runs: 200
        },
      //  evmVersion: "byzantium"
      }
    }
  }
}
