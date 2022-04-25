import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';

let provider;

export const init = () =>
  new Promise(async (resolve, reject) => {
    provider = window.ethereum;
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }

    // Legacy dapp browsers...
    else if (window.web3) {
      const web3 = window.web3;
      resolve(web3);
    } else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      const web3 = new Web3(provider);
      resolve(web3);
    }
  });

export const instanceContract = async () => {
  const web3 = await init();
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingContract.networks[networkId];
  const instance = new web3.eth.Contract(VotingContract.abi, deployedNetwork && deployedNetwork.address);
  console.log('instance terminé');
  return instance;
};
