//import { tallyVotes } from "./actionHandler";
import { removeCookies } from 'cookies-next';
import { notification } from './notification';
import { instanceContract } from './web3Client';

// Getting workfllow status
export const getWorkflowStatus = async (workflow, setWorkflowStatus) => {
  if (!workflow) {
    const instance = await instanceContract();
    const workflowStatus = Number(await instance.methods.getWorkflowstatus().call());
    // Update workflow status
    //setWorkflowStatus({ ...workflow, workflowStatus });
    getStatus(workflowStatus, setWorkflowStatus);
  }
};

// Handle workflow status
export const getStatus = (status, setWorkflowStatus) => {
  const workflowStatus = [
    { id: 0, status: 'Registering Voters', page:'/' },
    { id: 1, status: 'Proposals Registration Started', page: '/proposals' },
    { id: 2, status: 'Proposals Registration Ended',  },
    { id: 3, status: 'Voting Session Started', page: 'voting' },
    { id: 4, status: 'Voting Session Ended' },
    { id: 5, status: 'Votes Tallied', page: 'tally' },
    { id: 6, status: 'Reset' },
  ];

  let currentStatus;
  let nextStatus;

  workflowStatus.map((step) => {
    if (step.id === Number(status)) {
      if (Number(status) >= 1) {
        nextStatus = workflowStatus[step.id + 2];
      }
      if (Number(status) === 0 || Number(status) === 5) {
        nextStatus = workflowStatus[step.id + 1];
      }
      currentStatus = step;
    }

    setWorkflowStatus({ workflowStatus: status, currentStatus, nextStatus });
  });
};

// Workflow  PROPOSAL
// Launch registering
export const startRegisteringProposals = async (owner) => {
  const instance = await instanceContract();
  await instance.methods.startRegisteringProposals().send({ from: owner });
  window.location.replace('/proposals');
};

// Stop registering
export const stopRegisteringProposals = async (owner) => {
  const instance = await instanceContract();
  await instance.methods.stopRegisteringProposals().send({ from: owner });
  await startVotingSession(instance, owner);
  window.location.replace('/voting');
};

// Launch voting Session Only by owner/admin
export const startVotingSession = async (instance, owner) => {
  await instance.methods.startVotingSession().send({ from: owner });
};

// Stop voting Session and launch Tally votes Only by owner/admin
export const stopVotingSession = async (owner, proposals) => {
  const instance = await instanceContract();
  await instance.methods.stopVotingSession().send({ from: owner });
  await tallyVotes(instance, owner);

  window.location.replace('/tally');
};

// Launch vote tally Only by Owner - This function is used by stopVotingSession() into workflowHandler
export const tallyVotes = async (instance, owner) => {
  await instance.methods.tallyVotes().send({ from: owner });
};

// Launch reset contract
export const resetContract = async ( accountData, account) => {
  const instance = await instanceContract();
  await instance.methods.resetContract(account).send({ from: accountData.owner });

  notification(undefined, 'The contract reset');
  removeCookies('allVoters');
  window.location.replace('/');
};
