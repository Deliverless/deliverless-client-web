import BigchainDb from 'bigchaindb-orm';
import { mnemonicToSeedSync } from 'bip39';
import Web3 from 'web3';

import * as abiIndex from './abis/index.js';

const abi = abiIndex.default;

// intialize the bigchaindb orm just for keypair
// TODO: remove this and use web3 to generate keypair (requires testing)
// const bigchaindb = new BigchainDb("http://24.150.93.243");
// const seed = mnemonicToSeedSync('candy maple cake sugar pudding cream honey rich smooth crumble sweet treat').slice(0, 32);
// const keypair = new bigchaindb.driver.Ed25519Keypair(seed);

// *** REFERENCE objects dir: deliverless-chainlink/adapters/bigchaindb-utils/models ***

const web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://24.150.93.243:3334'));

// create a new user using web3
const web3 = new Web3('http://24.150.93.243:8546');
// get the account with the private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_WALLET_ID);

const address = process.env.REACT_APP_CONTRACTS_BIGCHAINDB_ADDRESS
// initialize the contract
const contractBigchaindb = new web3.eth.Contract(abi.abiBigchaindb, address);


export const getBalance = async () => {
    // get the balance of the account 
    const balance = await web3.eth.getBalance(account.address);
    console.log('account loaded successfully and balance is:', balance);
    return balance;
}

// creates new object in the database
export const createNewObject = async (modelName, metadataJson) => {
    // call(send) function within smart contract
    const receipt = await contractBigchaindb.methods.requestNewObject(modelName, JSON.stringify(metadataJson), "").send({ from: account.address, gas: 3000000 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt); console.log('requestId', requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    console.log(response)
    return response;
}

// TODO: fix data limit
// grab all objects in the database is not working because of size of the data (in-progress)
export const getObjectById = async (modelName, assetId) => {
    // call(send) function within smart contract
    const receipt = await contractBigchaindb.methods.requestGetObject(modelName, assetId, "").send({ from: account.address, gas: 3000000 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt); console.log('requestId', requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    return response;
}

// TODO: fix data limit
// find object(s) in the database by metadata (limited to 1 for now)
export const findObjectsByMetadata = async (modelName, metadataJson, limit = 1) => {
    // call(send) function within smart contract
    const receipt = await contractBigchaindb.methods.requestFindObject(modelName, JSON.stringify(metadataJson), limit, "").send({ from: account.address, gas: 3000000, gasPrice: 61011523 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt);
    console.log('requestId', requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    return response;
}

// append metadata to object(asset) in the database
export const updateObject = async (modelName, assetId, metadataJson) => {
    // call(send) function within smart contract
    const receipt = await contractBigchaindb.methods.requestAppendObject(modelName, assetId, JSON.stringify(metadataJson), "").send({ from: account.address, gas: 3000000 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt);
    console.log('requestId', requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    return response;
}

// burn object from the database
export const deleteObject = async (modelName, assetId) => {
    // call(send) function within smart contract
    const receipt = await contractBigchaindb.methods.requestBurnObject(modelName, assetId).send({ from: account.address, gas: 3000000 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt);
    console.log('requestId', requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    return response;
}

// Helper Functions

const getRequestId = (receipt) => {
    return receipt.events.ChainlinkRequested.returnValues['id'];
}

const requestResponse = async (requestId) => {
    var options = {
        reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 5,
            onTimeout: false
        },//filter by requestId to only listen for your request.
        topics: [null, String(requestId)]
    }
    let subscribe;
    let resp = await new Promise((resolve, reject) => {
        subscribe = web3socket.eth.subscribe('logs', options, async (error, result) => {
            if (error) return console.error(error);
        })
        subscribe.on("data", async (event) => {
            const data = Buffer.from(event?.data.slice(2), 'hex').toString('ascii')
            const extractText = data.match(/{"jobRunID":.*}/g);
            const parsedResponse = JSON.parse(extractText);
            if (!parsedResponse) return;
            if ((typeof parsedResponse.data) === 'string') {
                parsedResponse.data = JSON.parse(parsedResponse.data);
            }
            console.log("PARSED RESPONSE", parsedResponse.data)
            return resolve(parsedResponse);//resolve after data was found.
        })
    });
    subscribe.unsubscribe();
    return resp;
}

// *** Stripe ***

const addressStripe = process.env.REACT_APP_CONTRACTS_STRIPE_ADDRESS

// initialize the contract
const contractStripe = new web3.eth.Contract(abi.abiStripe, addressStripe)

export const getStripeSecret = async (total) => {
    // call(send) function within smart contract
    console.log('getStripeSecret', total)
    const receipt = await contractStripe.methods
        .requestSecretToken(total)
        .send({ from: account.address, gas: 3000000 });
    // requestId from Chainlink
    const requestId = getRequestId(receipt);
    console.log("getStripeSecret requestId", requestId);
    // return response from Chainlink
    const response = await requestResponse(requestId);
    return response;
};
