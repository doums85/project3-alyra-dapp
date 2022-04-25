import { getCookie } from 'cookies-next';
import { getVoterInfo } from './actionHandler';
import { init, instanceContract } from './web3Client';

// Get Owner/Admin Address
export const getOwner = async (accountData, setAccountData) => {
  if (!accountData) {
    const instance = await instanceContract();
    const owner = await instance.methods.owner().call();

    setAccountData({ ...accountData, owner });
  }
};

// Handle get & change account event from Metamask and stock address into localStorage
export const getVoterConnected = async (accountData, setAccountData) => {
  if (accountData && typeof accountData.voterConnected === 'undefined') {
    const web3 = await init();
    // Get current voter
    const account = await web3.eth.getAccounts();
    const accountConnected = account[0];
    // Get voter's informations
    if(accountConnected){
          const voterConnected = await getVoterInfo(accountData, accountConnected);

    !accountData.voterConnected && setAccountData({ ...accountData, voterConnected });

    if (getCookie('allVoters')) {
      const allVoters = JSON.parse(getCookie('allVoters'));
      if (!accountData.allVoters) {
        setAccountData({ ...accountData, allVoters });
      } else if (accountData.allVoters.length !== allVoters.length) {
        setAccountData({ ...accountData, allVoters });
      }
    }
    }

  }
};

// Connect wallet using buttom from front
export const connectWallet = async (accountData, setAccountData) => {
let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
    await provider.request({
      method: 'eth_requestAccounts',
    });

    await getVoterConnected(accountData, setAccountData);
  }
};
