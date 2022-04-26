import { getCookie, setCookies } from 'cookies-next';
import { factoryAddress } from './factoryAddress';
import { notification } from './notification';
import { init, instanceContract } from './web3Client';

// Get a Voter
export const getVoterInfo = async (accountData, account) => {
  if (!account) return notification('warn', "You've to enter an address", false);
  const web3 = await init();
  const instance = await instanceContract();
  const voter = await instance.methods.getVoter(account).call({ from: accountData.owner });

  const toEther = web3.utils.fromWei(voter.walletVoter, 'ether');

  const voterConnected = {
    account: voter.account,
    isRegistered: voter.isRegistered,
    hasVoted: voter.hasVoted,
    votedProposalId: voter.votedProposalId,
    walletVoter: toEther,
  };
  return voterConnected;
};

// Add A Voter
export const addVoter = async (accountData, setAccountData, addressEntered) => {
  if (!addressEntered) return notification(undefined, "You've to enter an address","kkdkfjf");
  if (accountData.voterFound) {
    if (accountData.voterFound.isRegistered) return notification('error', 'This account is already registered !');

    const instance = await instanceContract();
    const isAdded = await instance.methods.addVoter(addressEntered).send({ from: accountData.voterConnected.account });

    // Transaction is validate and return true
    if (isAdded.status) {
      setAccountData((previousState) => ({
        ...previousState,
        voterFound: { ...previousState.voterFound, isRegistered: true },
      }));

    
      const newVoter = await getVoterInfo(accountData, addressEntered);
      console.log(newVoter);
      await setVoterToCookie(newVoter,accountData);
      await searchHandler(accountData, setAccountData, addressEntered);
      // Send a notification
      notification('success', `the voter ${factoryAddress(addressEntered)} has been successfully added 🎉`);
    }
  }
};

//Delete A Voter
export const removeVoter = async (accountData, setAccountData, addressEntered, noConfirm) => {
  let confirm = true;
  if(!noConfirm){
     confirm = window.confirm(`Are you sure ? \nYou want to delete the voter ${factoryAddress(addressEntered)}  ?`);
  }
  if (confirm) {
    const instance = await instanceContract();
    const result = await instance.methods
      .removeVoter(addressEntered)
      .send({ from: accountData.voterConnected.account });

    if (result.status) {
      document.querySelector('#text').value &&
        searchHandler(accountData, setAccountData, document.querySelector('#text').value);
      const getAllVoters = getCookie('allVoters');
      if (getAllVoters) {
        const deleteVoter = JSON.parse(getAllVoters).filter((voter) => voter.account !== addressEntered);
        setCookies('allVoters', deleteVoter);
        notification('error', `the voter ${factoryAddress(addressEntered)} has been successfully deleted ☠️`);
      }
    }
  }
};

// Search Handler
export const searchHandler = async (accountData, setAccountData, addressEntered) => {
  const voterFound = await getVoterInfo(accountData, addressEntered);
  setAccountData({ ...accountData, voterFound });
};

// Voter into Allvoters constant
export const setVoterToCookie = (newVoter, accountData) => {
  let getAllVotersFromCookie;
  if (!getCookie('allVoters')) {
    getAllVotersFromCookie = getCookie('allVoters')
  }

accountData.allVoters
    ? setCookies('allVoters', JSON.stringify([...accountData.allVoters, newVoter]))
    : setCookies('allVoters', JSON.stringify([newVoter]));
};

export const getAllVotersFromCookie = (setAccountData) => {
  const getCookies = getCookie('allVoters');

  setAccountData((previousState) => ({
    ...previousState,
    allVoters: JSON.stringify(getCookies),
  }));
};

// PROPOSALS

// Add proposal
export const addProposal = async (voterAddress, proposalEntered, proposals) => {
if(!proposalEntered) return notification('warn', 'You\'ve to enter a proposal')
  const instance = await instanceContract();
  await instance.methods.addProposal(proposalEntered).send({ from: voterAddress });
};

// Get All Proposals
export const getAllProposals = async (voterAddress, proposalData, setProposalData) => {
  const instance = await instanceContract();
  const proposals = await instance.methods.getProposals().call({ from: voterAddress });
  if (proposalData.proposals.length !== proposals.length) {
    setProposalData({ proposals });
  }
};

// Voting proposal
export const voteProposal = async (proposalId, voterAddress, accountData, setAccountData) => {
  const instance = await instanceContract();
  await instance.methods.vote(proposalId).send({ from: voterAddress });
};

export const getWinningProposal = async (proposalData, setProposalData) => {
  if (!proposalData.winning) {
    const instance = await instanceContract();
    const winning = await instance.methods.getWinningProposalIds().call();
    setProposalData((previousState) => ({
      ...previousState,
      winning,
    }));
  }
};
