import { getCookie } from 'cookies-next';
import { getAllProposals } from './actionHandler';
import { getVoterConnected } from './authHandler';
import { notification } from './notification';
import { instanceContract } from './web3Client';

// Listening on change status
export const WorkFlowChanged = async (workflow) => {
  const instance = await instanceContract();
  await instance.events
    .WorkflowStatusChange()
    .on('data', async (event) => {
      const newStatus = event.returnValues.newStatus;
      workflow && workflow.currentStatus &&  workflow.currentStatus.id === Number(newStatus) ?
        notification(undefined, `Workflow status: ${workflow.currentStatus.status}`) : ''
    })
    .on('error', (err) => notification('error', err));
};

// Listen registered
export const VoterRegistered = async (accountData, setAccountData) => {
  const instance = await instanceContract();
  await instance.events
    .VoterRegistered()
    .on('data', async (event) => {
      if (getCookie('allVoters')) {
        const allVoters = JSON.parse(getCookie('allVoters'));
        setAccountData({ ...accountData, allVoters });
      }
    })
    .on('error', (err) => notification('error', err.message));
};

// Proposal
export const ProposalRegistered = async (voterAddress, proposalData, setProposalData) => {
  const instance = await instanceContract();
  await instance.events
    .ProposalRegistered()
    .on('data', async (event) => {
      await getAllProposals(voterAddress, proposalData, setProposalData);
      notification('success', 'Your proposal is added successfully ! 🎉');
    })
    .on('changed', (changed) => notification('warn', changed))
    .on('error', (err) => notification('error', err.message));
};

//Voted

export const voted = async (accountData, setAccountData) => {
  const instance = await instanceContract();
  await instance.events
    .Voted()
    .on('data', async (event) => {
      await getVoterConnected(accountData, setAccountData);
      notification('success', 'Your vote has been taken into account ! 📝 ');
    })
    .on('changed', (changed) => notification('warn', changed))
    .on('error', (err) => notification('error', err.message));
};
