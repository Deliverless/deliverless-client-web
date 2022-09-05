import Web3 from 'web3/dist/web3.min'
import TestABI from './abis/Test.json'

function web3Client() {
    const web3 = new Web3('http://24.150.93.243:8545')

    web3.eth.accounts.privateKeyToAccount('0x5ac91d47a4df631fb171f8c9d1e225e79be4e50b89b7b5f59e0086ba75a16235');

    return web3;
}

export const getEthereumPrice = async () => {
    const web3 = web3Client();

    const contract = new web3.eth.Contract(TestABI, "0x71F031F8954DaB9f4051862C1c72DE3138346Df5")

    contract.methods.requestEthereumPrice("0xb50A344C39fECc970f8b1BFaDf113DD2162b54ec", "1e35072d6f884c838ce79dec171c166f")
        .send({ from: '0xA2A81B100c2577eDA9Db72bE22B65d1b749079d9', gas: 3000000 })

    return (await contract.methods.currentPrice().call({ from: '0xA2A81B100c2577eDA9Db72bE22B65d1b749079d9' })) / 100

}

export const getGasBalance = async () => {
    const web3 = web3Client();
    return await web3.eth.getBalance('0xA2A81B100c2577eDA9Db72bE22B65d1b749079d9')
}

